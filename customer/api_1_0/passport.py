from . import api
from flask import request, jsonify, current_app, session, g
from customer.utils.response_code import RET
from customer import redis_store, db, constants
from customer.models import User
from sqlalchemy.exc import IntegrityError
import re
from customer.utils.commons import login_required


@api.route("/users", methods = ["POST"])
def register():
    """
    注册
    请求参数: 用户名, 密码, 确认密码, 验证码, 验证码ID
    参数格式: json
    :return:
    """
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    username = req_dict.get("username")
    password = req_dict.get("password")
    password2 = req_dict.get("password2")
    captcha = req_dict.get("captcha")
    captchaID = req_dict.get("captchaID")

    # 效验参数
    if not all([username, password, captcha, captchaID]):
        return jsonify(errno = RET.PARAMERR, errmsg = "参数不完整")

    # 判断邮箱格式
    if not re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$', username):
        # 表示格式不对
        return jsonify(errno = RET.PARAMERR, errmsg = "邮箱格式不对")

    if password != password2:
        return jsonify(errno=RET.PARAMERR, errmsg="两次密码不一致")

    # 业务逻辑处理
    # 从redis中取出验证码
    try:
        image_code =  redis_store.get("image_code_%s" % captchaID)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno = RET.DBERR, errmsg = "读取验证码异常")
    # 判断短信验证码是否过期
    if image_code is None:
        return jsonify(errno = RET.NODATA, errmsg = "验证码失效")

    # 删除redis中的验证码, 防止重复使用效验
    try:
        redis_store.delete("image_code_%s" % captchaID)
    except Exception as e:
        current_app.logger.error(e)

    # 判断用户填写的验证码的正确性
    if image_code.decode().lower() != captcha.lower():
        return jsonify(error = RET.DATAERR, errmsg = "验证码错误")

    # 保存用户的注册数据到数据库中
    user = User(email=username)
    user.password = password # 设置属性
    try:
        db.session.add(user)
        db.session.commit()
    except IntegrityError as e:
        # 数据库操作错误的回滚
        db.session.rollback()
        # 表示手机号出现了重复值, 即邮箱已注册过
        current_app.logger.error(e)
        return jsonify(errno=RET.DATAEXIST, errmsg="邮箱已存在")
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")

    # 保存登录状态到session中
    session["user_id"] = user.id
    # 返回结果
    return jsonify(errno = RET.OK, errmsg = "注册成功")

@api.route("/session", methods= ["POST"])
def login():
    """
    登录
    请求参数: 用户名, 密码, 验证码, 验证码ID
    参数格式: json
    :return:
    """
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    username = req_dict.get("username")
    password = req_dict.get("password")
    captcha = req_dict.get("captcha")
    captchaID = req_dict.get("captchaID")


    print(req_dict)
    # 效验参数
    if not all([username, password, captcha, captchaID]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    # 判断邮箱格式
    if not re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$', username):
        # 表示格式不对
        return jsonify(errno=RET.PARAMERR, errmsg="邮箱格式不对")

    # 判断错误次数是否超过限制，如果超过限制，则返回
    # redis记录： "access_nums_请求的ip": "次数"
    user_ip = request.remote_addr  # 用户的ip地址
    try:
        access_nums = redis_store.get("access_num_%s" % user_ip)
    except Exception as e:
        current_app.logger.error(e)
    else:
        if access_nums is not None and int(access_nums) >= constants.LOGIN_ERROR_MAX_TIMES:
            return jsonify(errno=RET.REQERR, errmsg="错误次数过多，请稍后重试")

    # 业务逻辑处理
    # 从redis中取出验证码
    try:
        image_code = redis_store.get("image_code_%s" % captchaID)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="读取验证码异常")
    # 判断短信验证码是否过期
    if image_code is None:
        return jsonify(errno=RET.NODATA, errmsg="验证码失效")

    # 删除redis中的验证码, 防止重复使用效验
    try:
        redis_store.delete("image_code_%s" % captchaID)
    except Exception as e:
        current_app.logger.error(e)

    # 判断用户填写的验证码的正确性
    if image_code.decode().lower() != captcha.lower():
        return jsonify(error=RET.DATAERR, errmsg="验证码错误")

    # 从数据库中根据手机号查询用户的数据对象
    try:
        user = User.query.filter(User.email==username, User.isdelete==False).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="获取用户信息失败")

    # 用数据库的密码与用户填写的密码进行对比验证
    if user is None or not user.check_password(password):
        # 如果验证失败，记录错误次数，返回信息
        try:
            # redis的incr可以对字符串类型的数字数据进行加一操作，如果数据一开始不存在，则会初始化为1
            redis_store.incr("access_num_%s" % user_ip)
            redis_store.expire("access_num_%s" % user_ip, constants.LOGIN_ERROR_FORBID_TIME)
        except Exception as e:
            current_app.logger.error(e)
        return jsonify(errno=RET.DATAERR, errmsg="用户名或密码错误")

    # 如果验证相同成功，保存登录状态， 在session中
    session["user_id"] = user.id

    return jsonify(errno=RET.OK, errmsg="登录成功")


@api.route("/session", methods=["GET"])
def check_login():
    """检查登陆状态"""
    # 尝试从session中获取用户的名字
    name = session.get("name")
    # 如果session中数据name名字存在，则表示用户已登录，否则未登录
    if name is not None:
        return jsonify(errno=RET.OK, errmsg="true", data={"name": name})
    else:
        return jsonify(errno=RET.SESSIONERR, errmsg="false")

@api.route("/session", methods=["DELETE"])
def logout():
    """登出"""
    # 清除session数据
    csrf_token = session.get("csrf_token")
    session.clear()
    session["csrf_token"] = csrf_token
    return jsonify(errno=RET.OK, errmsg="OK")

@api.route("/passwd", methods = ['UPDATE'])
@login_required
def update_user_pass():
    '''
    更新跟进信息
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典

    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    oldpass = req_dict.get("oldpass")
    newpass = req_dict.get("newpass")
    newpass2 = req_dict.get("newpass2")

    if not all([oldpass, newpass, newpass2]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        user = User.query.filter(User.id == user_id, User.isdelete == False).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")

    if not user:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")

    user.password = newpass

    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="保存失败")

    return jsonify(errno=RET.OK, errmsg="保存成功")

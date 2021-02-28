from . import api
from flask import request, jsonify, current_app, g
from customer.utils.response_code import RET
from customer import  db, constants
from customer.models import  Customer
from sqlalchemy.exc import IntegrityError
from customer.utils.image_storage import storage, delimage
from customer.utils.commons import login_required


@api.route("/customer")
@login_required
def get_customer_info():
    """获取客户基本信息"""
    user_id = g.user_id
    try:
        customers = Customer.query.filter(Customer.user == user_id, Customer.isdelete==False).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询客户信息失败")

    customer_dict_list = []
    if customers:
        for customer in customers:
            customer_dict_list.append(customer.to_base_dict())
    return jsonify(errno=RET.OK, errmsg="OK", data = customer_dict_list)


@api.route("/customer", methods = ['POST'])
@login_required
def add_customer_info():
    '''添加客户基本信息'''

    user_id = g.user_id
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    name = req_dict.get("name")
    contacts = req_dict.get("contacts")
    phone = req_dict.get("phone")

    # 效验参数
    if not all([name, contacts, phone]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.name == name, Customer.isdelete == True).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")
    if customer:
        customer.contacts = contacts
        customer.tel = phone
        customer.isdelete = False
    else:
        customer = Customer(name=name, contacts=contacts, tel=phone, user=user_id)

    try:
        db.session.add(customer)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DATAEXIST, errmsg="该客户已存在")

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")

    data = customer.to_base_dict()

    return jsonify(errno=RET.OK, errsmg="添加成功", data=data)

@api.route("/customer", methods = ['UPDATE'])
@login_required
def update_customer_info():
    '''更新客户基本信息'''

    user_id = g.user_id
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    id = req_dict.get("id")
    name = req_dict.get("name")
    contacts = req_dict.get("contacts")
    phone = req_dict.get("phone")

    # 效验参数
    if not all([id, name, contacts, phone]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    # 保存用户的注册数据到数据库中
    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取次客户信息")
    if not customer:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")

    customer.name = name
    customer.contacts = contacts
    customer.tel = phone

    try:
        db.session.add(customer)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")

    return jsonify(errno=RET.OK, errsmg="保存成功")

@api.route("/customer", methods = ['DELETE'])
@login_required
def delete_customer_info():
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    id = req_dict.get("id")

    # 效验参数
    if not all([id,]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")
    if not customer:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")

    customer.isdelete = True

    try:
        db.session.add(customer)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")

    return jsonify(errno=RET.OK, errsmg="保存成功")

@api.route("/detail", methods = ['POST'])
@login_required
def update_customer_detail():
    '''
    更新客户详细信息
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    id = req_dict.get("id")
    info = req_dict.get("info")
    struct = req_dict.get("struct")
    decision = req_dict.get("decision")
    network = req_dict.get("network")
    # 效验参数
    if not all([id, ]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False, Customer.user == user_id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")
    if not customer:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")


    customer.baseinfo = info
    customer.structure = struct
    customer.decision = decision
    customer.network = network

    try:
        db.session.add(customer)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="查询数据库异常")

    return jsonify(errno=RET.OK, errmsg="保存成功")


@api.route("/detail/<id>", methods = ['GET'])
@login_required
def get_customer_detail(id):
    '''
    获取客户详细信息
    '''
    user_id = g.user_id
    # 效验参数
    if not all([id, ]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False,
                                         Customer.user == user_id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")
    if not customer:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")

    info = customer.baseinfo
    struct = customer.structure
    decision = customer.decision
    network = customer.network

    data = {
        "info" : info,
        "struct" : struct,
        "decision" : decision,
        "network" : network
    }

    return jsonify(errno=RET.OK, errsmg="查询成功", data = data)

@api.route("/uploadstruct/<id>", methods = ['POST'])
@login_required
def upload_struct_image(id):
    '''
    上传架构图片
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    image_file = request.files.get("file")
    if image_file is None:
        return jsonify(code=RET.PARAMERR, msg = "未上传数据")

    image_data = image_file.read()

    # 调用七牛上传图片, 返回文件名
    try:
        file_name = storage(image_data)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(code=RET.THIRDERR, msg = "上传图片失败")

    avatar_url = constants.QINIU_URL_DOMAIN + file_name
    # 保存成功返回
    return jsonify(code=RET.OK, msg="保存成功", data={"src": avatar_url})

@api.route("/uploadnetwork/<id>", methods = ['POST'])
@login_required
def upload_network_image(id):
    '''
    上传网络图片
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    image_file = request.files.get("file")
    if image_file is None:
        return jsonify(code=RET.PARAMERR, msg = "未上传数据")

    image_data = image_file.read()

    # 调用七牛上传图片, 返回文件名
    try:
        file_name = storage(image_data)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(code=RET.THIRDERR, msg = "上传图片失败")

    avatar_url = constants.QINIU_URL_DOMAIN + file_name
    # 保存成功返回
    return jsonify(code=RET.OK, msg="保存成功", data={"src": avatar_url})

@api.route("/follow", methods = ['UPDATE'])
@login_required
def update_customer_follow():
    '''更新客户基本信息'''
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    id = req_dict.get("id")
    stat = req_dict.get("stat")
    if id == None and stat == None:
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False,
                                         Customer.user == user_id).update({"isfollow" : stat})
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")

    return jsonify(errno=RET.OK, errmsg = "更新成功")

@api.route("/deleteimage", methods = ['POST'])
@login_required
def delete_image():
    '''
    删除网络图片
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典
    image_path = request.form.get('imgpath')

    if image_path == None:
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    image_path = image_path.replace(constants.QINIU_URL_DOMAIN, '')
    try:
        delimage(image_path)

    except Exception as e:
        current_app.logger.error(e)
        return jsonify(code=RET.THIRDERR, msg="删除图片失败")
    return jsonify(code=RET.OK, msg="删除图片成功")
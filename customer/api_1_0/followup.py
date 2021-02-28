from . import api
from flask import request, jsonify, current_app,  g
from customer.utils.response_code import RET
from customer import  db
from customer.models import Customer, FollowUp
from customer.utils.commons import login_required


@api.route("/follow/<id>", methods = ['POST'])
@login_required
def update_follow_info(id):
    '''
    更新跟进信息
    '''
    user_id = g.user_id
    # 获取请求的json数据,返回字典

    # 获取请求的json数据,返回字典
    req_dict = request.get_json()
    status = req_dict.get("status")
    content = req_dict.get("content")

    if not all([status, content]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")

    try:
        customer = Customer.query.filter(Customer.id == id, Customer.isdelete == False, Customer.user == user_id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")
    if not customer:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")


    follow = FollowUp(state=status, content=content, customerid=id)

    try:
        db.session.add(follow)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="保存失败")
    # 保存成功返回
    data = follow.to_dict()
    return jsonify(errno=RET.OK, errmsg="保存成功", data=data)

@api.route("/follow/<id>", methods = ['GET'])
@login_required
def get_follow_info(id):
    '''
    获取跟进信息
    '''
    user_id = g.user_id

    try:
        follows = FollowUp.query.filter(FollowUp.customerid == id, FollowUp.isdelete == False).order_by(FollowUp.update_time.desc()).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户信息")
    if not follows:
        return jsonify(errno=RET.DBERR, errmsg="无此客户信息")


    data = []

    for follow in follows:
        data.append(follow.to_dict())

    return jsonify(errno=RET.OK, errmsg="获取成功", data = data)


@api.route("/follow/<id>", methods = ['DELETE'])
@login_required
def delete_follow_info(id):
    '''
    删除跟进信息
    '''
    try:
        follow = FollowUp.query.filter(FollowUp.id == id, FollowUp.isdelete == False).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户跟进信息")
    if not follow:
        return jsonify(errno=RET.DBERR, errmsg="无此客户跟进信息")

    follow.isdelete = True

    try:
        db.session.add(follow)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="无法获取此客户跟进信息")

    return jsonify(errno=RET.OK, errmsg="删除成功")





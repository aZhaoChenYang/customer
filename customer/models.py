# -*- coding:utf-8 -*-

from datetime import datetime
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from customer import constants


class BaseModel(object):
    """模型基类，为每个模型补充创建时间与更新时间"""

    create_time = db.Column(db.DateTime, default=datetime.now)  # 记录的创建时间
    update_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)  # 记录的更新时间
    isdelete = db.Column(db.Boolean, default=False)


class User(BaseModel, db.Model):
    """用户"""

    __tablename__ = "user_profile"

    id = db.Column(db.Integer, primary_key=True)  # 用户编号
    password_hash = db.Column(db.String(128), nullable=False)  # 加密的密码
    email = db.Column(db.String(20), unique=True, nullable=False)  # 邮箱
    customer = db.relationship("Customer", backref="User")
    # 加上property装饰器后，会把函数变为属性，属性名即为函数名
    @property
    def password(self):
        """读取属性的函数行为"""
        # print(user.password)  # 读取属性时被调用
        # 函数的返回值会作为属性值
        # return "xxxx"
        raise AttributeError("这个属性只能设置，不能读取")

    # 使用这个装饰器, 对应设置属性操作
    @password.setter
    def password(self, value):
        """
        设置属性  user.passord = "xxxxx"
        :param value: 设置属性 时的数据 value就是"xxxxx", 原始的明文密码
        :return:
        """
        self.password_hash = generate_password_hash(value)

    def check_password(self, passwd):
        """
        检验密码的正确性
        :param passwd:  用户登录时填写的原始密码
        :return: 如果正确，返回True， 否则返回False
        """
        return check_password_hash(self.password_hash, passwd)

    def to_dict(self):
        """将对象转换为字典数据"""
        user_dict = {
            "user_id": self.id,
            "name": self.name,
            "email": self.email,
            "create_time": self.create_time.strftime("%Y-%m-%d %H:%M:%S")
        }
        return user_dict



class Customer(BaseModel, db.Model):
    """客户"""

    __tablename__ = "customer_info"

    id = db.Column(db.Integer, primary_key=True)  # 客户编号
    name = db.Column(db.String(32), nullable=False, unique=True)  # 客户名字
    contacts = db.Column(db.String(10), nullable=False)  # 联系人
    tel = db.Column(db.String(15), nullable=False) # 联系电话
    date = db.Column(db.DateTime) #最后一次跟进日期
    isfollow = db.Column(db.Boolean, default=False) #是否关注
    baseinfo = db.Column(db.String(400)) # 公司基本情况
    structure = db.Column(db.String(400)) # 公司组织架构
    structuresrc = db.Column(db.String(256)) # 组织架构图片
    decision = db.Column(db.String(400)) # 决策链及任务情况
    network = db.Column(db.String(400)) # 设备采购及网络情况
    networksrc = db.Column(db.String(256)) # 设备采购及网络情况图片
    user = db.Column(db.ForeignKey("user_profile.id"), nullable=False)
    follows = db.relationship("FollowUp", backref="customer")
    def to_base_dict(self):
        """将对象转换为字典数据"""
        user_dict_info = {
            "ID": self.id,
            "CustomerName": self.name,
            "Contacts": self.contacts,
            "Tel": self.tel,
            "IsFollow": self.isfollow,
        }
        follow  =  FollowUp.query.filter(FollowUp.customerid == self.id, FollowUp.isdelete == False).order_by(FollowUp.update_time.desc()).first();
        if follow:
            date = follow.update_time.strftime("%Y-%m-%d %H:%M:%S");
        else:
            date = None
        user_dict_info["Date"] = date
        return user_dict_info

class FollowUp(BaseModel, db.Model):
    '''跟进'''
    __tablename__ = "follow_info"

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(10), nullable=False)
    content = db.Column(db.String(400), nullable=False)
    customerid = db.Column(db.ForeignKey("customer_info.id"), nullable=False)

    def to_dict(self):
        """将对象转换为字典数据"""
        status_dict = {
            "1":"初次拜访",
            "2":"接触中",
            "3":"意  向",
            "4":"报  价",
            "5":"持续跟进",
            "6":"成  交",
            "7":"售  后",
            '8':"待  定",
            "9":"搁  置",
            "10":"已放弃"
        }
        user_dict = {
            "id": self.id,
            "status": status_dict.get(self.state),
            "content": self.content,
            "date": self.create_time.strftime("%Y-%m-%d %H:%M:%S")
        }
        return user_dict
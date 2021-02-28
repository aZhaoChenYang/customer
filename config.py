import redis
import os

class Config(object):
    """配置信息"""

    SECRET_KEY = os.urandom(24)

    # 数据库
    SQLALCHEMY_DATABASE_URI = "mysql://root:123456@127.0.0.1:3306/customer"
    SQLALCHEMY_MODIFICATIONS = True

    # redis
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379

    # flask-session配置
    SESSION_TYPE = "redis"
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT)
    SESSION_USE_SIGNER = True # 对cookie中的session进行隐藏
    PERMANENT_SESSION_LIFETIME = 86400 # session数据的有效期 单位秒


class DevelopmentConfig(Config):
    """开发模式的配置信息"""
    DEBUG = True

class ProductConfig(Config):
    """生产环境配置信息"""
    pass

config_map = {
    "develop": DevelopmentConfig,
    "product": ProductConfig
}
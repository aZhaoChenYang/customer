from flask import Blueprint

# 创建蓝图对象
api = Blueprint("api_1_0", __name__)

# 导入蓝图的视图
from . import verify_code
from . import passport
from . import customer
from . import followup
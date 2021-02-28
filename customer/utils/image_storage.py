
from qiniu import Auth, put_data
from qiniu import BucketManager
import qiniu.config

#需要填写你的 Access Key 和 Secret Key
access_key = 'fiZZqMMY_sOGztSTBpcVleK8rr7HNTq7iTDL6-Sn'
secret_key = 'TcuiYaZCh5pOaIxzJZ7CSiv43TT_EKeXiPnB6Nn8'

def storage(file_data):
    """上传文件到七牛
    :param file_data: 要上传的文件数据
    :return:
    """
    #构建鉴权对象
    q = Auth(access_key, secret_key)

    #要上传的空间
    bucket_name = 'customer-mine'


    #生成上传 Token，可以指定过期时间等
    token = q.upload_token(bucket_name, None, 3600)


    ret, info = put_data(token, None, file_data)
    if info.status_code == 200:
        # 表示上传成功, 返回文件名
        return ret.get("key")
    else:
        # 上传失败
        raise Exception("上传七牛失败")

    # print(info)
    # print("*" * 10)
    # print(ret)
def delimage(filepath):
    # 构建鉴权对象
    q = Auth(access_key, secret_key)

    # 初始化BucketManager
    bucket = BucketManager(q)
    # 要上传的空间
    bucket_name = 'customer-mine'
    key = filepath

    ret, info = bucket.delete(bucket_name, key)
    if info.status_code == 200:
        # 表示删除成功
        return
    else:
        # 删除失败
        raise Exception("上传七牛失败")





if __name__ == '__main__':
    # with open("1.jpg", "rb") as f:
    #     file_data = f.read()
    # storage(file_data)
    delimage("background.jpg")

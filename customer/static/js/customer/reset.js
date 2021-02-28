layui.use(["form", "table"], function () {
    var b = layui.form, a = layui.layer, c = layui.$;

    b.on("submit(saveBtn)", function (d) {
        if (d.oldpass == "") {
            b.msg("旧密码不能为空");
            return false
        }
        if(d.newpass == ""){
            b.msg("新密码不能为空");
            return false
        }else {
            // var h = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            // if (!h.exec(j.password)) {
            //     b.msg("密码强度不足,应为8位以上,至少包括一个大写字母,一个小写字母,一个数字,一个特殊字符");
            //     return false
            // }
        }
        if(d.newpass != d.oldpass){
            b.msg("确认密码和新密码不一样");
            return false
        }
        c.ajax({
            url: "/api/v1.0/passwd",
            type: "update",
            data: JSON.stringify(d.field),
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (g) {
                if (g.errno == "0") {
                    var f = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(f)
                } else {
                    a.msg(g.errmsg)
                }
            }
        });
        return false
    })
});
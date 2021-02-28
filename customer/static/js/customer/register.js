layui.use(["form"], function () {
    var c = layui.form, b = layui.layer, e = layui.jquery;
    var f = "";

    function d() {
        var h = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            h += performance.now()
        }
        var g = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (j) {
            var i = (h + Math.random() * 16) % 16 | 0;
            h = Math.floor(h / 16);
            return (j == "x" ? i : (i & 3 | 8)).toString(16)
        });
        return g
    }

    function a() {
        f = d();
        var g = "/api/v1.0/image_codes/" + f;
        e("#captchaPic").attr("src", g)
    }

    a();
    e(document).ready(function () {
        e(".layui-container").particleground({dotColor: "#7ec7fd", lineColor: "#7ec7fd"});
        e("#captchaPic").click(function () {
            a()
        })
    });
    c.on("submit(register)", function (j) {
        j = j.field;
        if (j.username == "") {
            b.msg("用户名不能为空");
            return false
        } else {
            var h = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!h.exec(j.username)) {
                b.msg("邮箱格式不正确");
                return false
            }
        }
        if (j.password == "") {
            b.msg("密码不能为空");
            return false
        } else {
            // var h = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            // if (!h.exec(j.password)) {
            //     b.msg("密码强度不足,应为8位以上,至少包括一个大写字母,一个小写字母,一个数字,一个特殊字符");
            //     return false
            // }
        }
        if (j.password1 == "") {
            b.msg("确认密码不能为空");
            return false
        }
        if (j.password != j.password1) {
            b.msg("两次密码输入不一致");
            return false
        }
        if (j.captcha == "") {
            b.msg("验证码不能为空");
            return false
        }
        var i = {username: j.username, password: j.password, password2: j.password1, captcha: j.captcha, captchaID: f};
        var g = JSON.stringify(i);
        e.ajax({
            url: "/api/v1.0/users",
            type: "post",
            data: g,
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (k) {
                if (k.errno == "0") {
                    location.href = "/index.html"
                } else {
                    a();
                    b.msg(k.errmsg)
                }
            }
        });
        return false
    })
});
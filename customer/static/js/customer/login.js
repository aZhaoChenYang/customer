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
    c.on("submit(login)", function (i) {
        i = i.field;
        if (i.username == "") {
            b.msg("用户名不能为空");
            return false
        }
        if (i.password == "") {
            b.msg("密码不能为空");
            return false
        }
        if (i.captcha == "") {
            b.msg("验证码不能为空");
            return false
        }
        var h = {username: i.username, password: i.password, captcha: i.captcha, captchaID: f};
        var g = JSON.stringify(h);
        e.ajax({
            url: "/api/v1.0/session",
            type: "post",
            data: g,
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (j) {
                if (j.errno == "0") {
                    location.href = "/index.html"
                } else {
                    a();
                    b.msg(j.errmsg)
                }
            }
        });
        return false
    })
});
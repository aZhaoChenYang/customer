layui.use(["form", "layedit", "laydate", "carousel", "layer"], function () {
    var a = layui.form, h = layui.layer, g = layui.layedit, f = layui.jquery;

    function c(m) {
        var k = new RegExp("(^|&)" + m + "=([^&]*)(&|$)", "i");
        var l = window.location.search.substr(1).match(k);
        if (l != null) {
            return unescape(l[2])
        }
        return null
    }

    var b = g.build("info", {tool: ["strong", "italic", "underline", "del", "addhr", "|", "fontFomatt", "colorpicker", "face", "|", "left", "center", "right", , "|", "fullScreen"]});
    var e = g.build("struct", {
        tool: ["strong", "italic", "underline", "del", "addhr", "|", "fontFomatt", "colorpicker", "face", "|", "left", "center", "right", , "|", "image", "fullScreen"],
        uploadImage: {
            url: "/api/v1.0/uploadstruct/" + c("id"),
            type: "post",
            headers: {"X-CSRFToken": j("csrf_token")}
        },
        calldel: {url: "/api/v1.0/deleteimage"}
    });
    var i = g.build("decision", {tool: ["strong", "italic", "underline", "del", "addhr", "|", "fontFomatt", "colorpicker", "face", "|", "left", "center", "right", , "|", "fullScreen"]});
    var d = g.build("network", {
        tool: ["strong", "italic", "underline", "del", "addhr", "|", "fontFomatt", "colorpicker", "face", "|", "left", "center", "right", , "|", "image", "fullScreen"],
        uploadImage: {url: "/api/v1.0/uploadnetwork/" + c("id"), type: "post",}
    });

    function j(k) {
        var l = document.cookie.match("\\b" + k + "=([^;]*)\\b");
        return l ? l[1] : undefined
    }

    f(document).ready(function () {
        f.ajax({
            url: "/api/v1.0/detail/" + c("id"), type: "get", async: false, dataType: "json", success: function (k) {
                g.setContent(b, k.data.info, false);
                g.setContent(e, k.data.struct, false);
                g.setContent(i, k.data.decision, false);
                g.setContent(d, k.data.network, false)
            }
        })
    });
    a.on("submit(demo1)", function (k) {
        k.field.id = c("id");
        k.field.info = g.getContent(b);
        k.field.struct = g.getContent(e);
        k.field.decision = g.getContent(i);
        k.field.network = g.getContent(d);
        f.ajax({
            url: "/api/v1.0/detail",
            type: "post",
            data: JSON.stringify(k.field),
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (l) {
                h.msg(l.errmsg);
                return false
            }
        });
        return false
    })
});
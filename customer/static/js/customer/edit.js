layui.use(["form"], function () {
    var c = layui.form, b = layui.layer, d = layui.$;

    function a(g) {
        var e = new RegExp("(^|&)" + g + "=([^&]*)(&|$)", "i");
        var f = window.location.search.substr(1).match(e);
        if (f != null) {
            return unescape(f[2])
        }
        return null
    }

    c.on("submit(saveBtn)", function (e) {
        e.field["id"] = a("id");
        d.ajax({
            url: "/api/v1.0/customer",
            type: "update",
            data: JSON.stringify(e.field),
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (j) {
                if (j.errno == "0") {
                    var f = parent.layui.table.cache["currentTableId"];
                    for (var g = 0; g < f.length; g++) {
                        if (f[g].ID == e.field["id"]) {
                            f[g].CustomerName = e.field["name"];
                            f[g].Contacts = e.field["contacts"];
                            f[g].Tel = e.field["phone"];
                            break
                        }
                    }
                    parent.layui.table.reload("currentTableId", {data: f});
                    var h = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(h)
                } else {
                    b.msg(j.errmsg)
                }
            }
        });
        return false
    })
});
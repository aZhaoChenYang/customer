layui.use(["form", "table"], function () {
    var b = layui.form, a = layui.layer, c = layui.$;
    b.on("submit(saveBtn)", function (d) {
        c.ajax({
            url: "/api/v1.0/customer",
            type: "post",
            data: JSON.stringify(d.field),
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (g) {
                if (g.errno == "0") {
                    var e = parent.layui.table.cache["currentTableId"];
                    e.unshift(g.data);
                    parent.layui.table.reload("currentTableId", {data: e});
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
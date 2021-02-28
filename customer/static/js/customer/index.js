layui.use(["table", "jquery", "tableFilter"], function () {
    var g = layui.jquery, e = layui.table, c = layui.form, f = layui.tableFilter;

    function a(d) {
        var i = document.cookie.match("\\b" + d + "=([^;]*)\\b");
        return i ? i[1] : undefined
    }

    var h = {};
    g.ajax({
        url: "/api/v1.0/customer", type: "get", async: false, dataType: "json", success: function (d) {
            if (d.errno == 4101) {
                layer.msg("data.errmsg");
                location.href = "/login.html"
            } else {
                if (d.errno == 0) {
                    h = d.data
                } else {
                    layer.msg(d.errmsg)
                }
            }
        }
    });
    var b = e.render({
        elem: "#currentTableId",
        toolbar: "#toolbarDemo",
        defaultToolbar: ["filter", "exports", "print", {
            title: "提示",
            layEvent: "LAYTABLE_TIPS",
            icon: "layui-icon-tips"
        }],
        cols: [[{field: "ID", width: 80, title: "序号", sort: true}, {
            field: "CustomerName",
            title: "客户名称",
            minWidth: 150
        }, {field: "Contacts", width: 120, title: "联系人"}, {field: "Tel", title: "联系方式", minWidth: 150}, {
            field: "Date",
            width: 180,
            title: "跟进日期",
            sort: true
        }, {field: "FollowUp", title: "操作", width: 250, toolbar: "#buttonTpl"}, {
            field: "IsFollow",
            title: "是否关注",
            width: 110,
            templet: "#checkboxTpl",
            unresize: true,
            sort: true
        }]],
        data: h,
        skin: "line",
        initSort: {field: "Date", type: "desc"}
    });
    f.render({"elem": "#currentTableId", "mode": "local", "filters": [{field: "CustomerName"},]});
    e.on("toolbar(currentTableFilter)", function (i) {
        if (i.event === "add") {
            var d = layer.open({
                title: "添加用户",
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ["100%", "100%"],
                content: "/add.html",
            });
            g(window).on("resize", function () {
                layer.full(d)
            })
        }
        if (i.event === "logout") {
                g.ajax({
                    url: "/api/v1.0/session",
                    type: "delete",
                    async: false,
                    dataType: "json",
                    success: function (j) {
                        if (j.errno == "0") {
                            location.href = "/login.html"
                        } else {
                            generateImageCode();
                            layer.msg(j.errmsg)
                        }
                    }
                })
            }
        if(i.event === "reset"){
            console.log(113)
            var d = layer.open({
                title: "重置密码",
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ["100%", "100%"],
                content: "/reset.html",
            });
            g(window).on("resize", function () {
                layer.full(d)
            })
        }

    });
    e.on("tool(currentTableFilter)", function (j) {
        var i = j.data;
        if (j.event === "edit") {
            id = g(this).attr("custumerid");
            var d = layer.open({
                title: "编辑用户",
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ["100%", "100%"],
                content: "/edit.html?id=" + i.ID,
                success: function (l, m) {
                    var k = layer.getChildFrame("body", m);
                    k.find("input[name=name]").val(i.CustomerName);
                    k.find("input[name=contacts]").val(i.Contacts);
                    k.find("input[name=phone]").val(i.Tel)
                }
            })
        } else {
            if (j.event === "delete") {
                i = {};
                id = g(this).attr("custumerid");
                i["id"] = id;
                g.ajax({
                    url: "/api/v1.0/customer",
                    type: "delete",
                    data: JSON.stringify(i),
                    contentType: "application/json",
                    async: false,
                    dataType: "json",
                    success: function (l) {
                        if (l.errno == "0") {
                            var k = e.cache["currentTableId"];
                            k.splice(j.tr.data("index"), 1);
                            b.reload({data: k})
                        } else {
                            generateImageCode();
                            layer.msg(l.errmsg)
                        }
                    }
                })
            } else {
                if (j.event === "detail") {
                    id = g(this).attr("custumerid");
                    var d = layer.open({
                        title: "查看客户详细",
                        type: 2,
                        shade: 0.2,
                        maxmin: true,
                        shadeClose: true,
                        area: ["100%", "100%"],
                        content: "/detail.html?id=" + i.ID,
                        success: function (l, m) {
                            var k = layer.getChildFrame("body", m);
                            k.find("h1[class=layui-timeline-title]").html(i.CustomerName)
                        }
                    })
                } else {
                    if (j.event === "followup") {
                        id = g(this).attr("custumerid");
                        var d = layer.open({
                            title: "查看客户跟进记录",
                            type: 2,
                            shade: 0.2,
                            maxmin: true,
                            shadeClose: true,
                            area: ["100%", "100%"],
                            content: "/followup.html?id=" + i.ID,
                            success: function (l, m) {
                                var k = layer.getChildFrame("body", m);
                                k.find("h1[class=layui-timeline-title]").html(i.CustomerName)
                            },
                            cancel: function (m, l) {
                                var k = layer.getChildFrame("body", m);
                                date = k.find('h3[class="layui-timeline-title"]').html();
                                if (date != undefined) {
                                    var m = date.indexOf("&nbsp;");
                                    date = date.substr(0, m)
                                }
                                j.update({Date: date == undefined ? "" : date})
                            }
                        })
                    }
                }
            }
        }
    });
    c.on("switch(follow)", function (d) {
        data = {id: this.value, stat: d.elem.checked};
        g.ajax({
            url: "/api/v1.0/follow",
            type: "update",
            data: JSON.stringify(data),
            contentType: "application/json",
            async: false,
            dataType: "json",
            success: function (l) {
                if (l.errno == "0") {
                    var j = e.cache["currentTableId"];
                    for (var k = 0; k < j.length; k++) {
                        if (j[k].ID == data.id) {
                            j[k].IsFollow = data.field["phone"];
                            break
                        }
                    }
                    parent.layui.table.reload("currentTableId", {data: j})
                } else {
                    layer.msg(l.errmsg)
                }
            }
        })
    })
});
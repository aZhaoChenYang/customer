layui.use(['element', 'jquery', 'layer', 'form', 'table', 'layedit'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layedit = layui.layedit,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/tags.json',
		toolbar: '#tableToolbar', //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
					type: 'checkbox',
					fixed: 'left'
				}, {
					field: 'tagId',
					title: '日记ID',
					width: 120,
					fixed: 'left',
					unresize: true,
					sort: true
				}, {
					field: 'tagName',
					title: '日记内容',
					width: 400,
				}, {
					field: 'tagName',
					title: '发布用户',
					width: 120,
				},
				{
					field: 'tagName',
					title: '发布时间',
					width: 200,
				},
				{
					field: 'tagName',
					title: '更新时间',
					width: 200,
				},
				{
					fixed: 'right',
					title: '操作',
					toolbar: '#tableBar',
					width: 150
				}
			]
		],
		page: true
	});

	//头工具栏事件
	table.on('toolbar(dataTable)', function(obj) {
		var checkStatus = table.checkStatus(obj.config.id);
		switch (obj.event) {
			case 'deleteSelected':
				var data = checkStatus.data;
				layer.alert(JSON.stringify(data));
				break;
		};
	});

	//监听行工具事件
	table.on('tool(dataTable)', function(obj) {
		var data = obj.data;
		//console.log(obj)
		if (obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		} else if (obj.event === 'edit') {
			layeditorInit("编辑内容", data.tagName);
		}
	});

	/**
	 * 初始化编辑器
	 * @param {Object} title  弹窗标题
	 * @param {Object} value  需要填充编辑器的内容
	 */
	function layeditorInit(title, value) {
		var reply_idex;
		layer.open({
			type: 1,
			content: '<div style="margin:10px"><textarea class="layui-textarea" id="daily-editor" style="display: none;"></textarea></div>',
			title: title,
			btn: '提交',
			anim: 1,
			area: ['550px', '320px'],
			maxmin: true,
			yes: function(index) {
				//获取编辑器的值（HTML源码）
				var newValue = layedit.getContent(reply_idex);
				if(newValue==''||newValue.length==0)
					return;
				/**
				 * ajax 请求
				 */
				layer.msg(layedit.getContent(reply_idex), {
					icon: 6
				});
				layer.close(index);
			},
			success: function() {
				//初始化编辑器
				reply_idex = layedit.build('daily-editor', {
					height: 150
				});
				if (value !== null) {
					//获取子iframe的页面元素
					// console.log($("#LAY_layedit_"+reply_idex).contents().find('body'));
					
					//填充编辑器
					$("#LAY_layedit_"+reply_idex).contents().find('body').html(value);
				}
			}
		});
	}

	/**
	 * 发布日记
	 */
	$("#btn_add").click(function() {
		layeditorInit("发布新日记",null);
	});

	/**
	 * 搜索
	 */
	$("#btn_search").click(function() {
		layer.prompt({
			formType: 0,
			title: "请输入搜索关键字",
			btn: "搜索",
		}, function(value, index) {
			/* ajax 请求搜索 */
			layer.msg(value);
			layer.close(index);
		});
	});
});

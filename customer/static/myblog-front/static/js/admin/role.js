layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/role.json',
		toolbar: '#tableToolbar' , //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
				type: 'checkbox',
				fixed: 'left'
			}, {
				field: 'roleId',
				title: '角色ID',
				width: 200,
				fixed: 'left',
				unresize: true,
				sort: true
			}, {
				field: 'roleName',
				title: '角色名称',
				width: 400,
				edit: 'text'
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#tableBar',
				width: 150
			}]
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
			layer.prompt({
				formType: 0,
				title:"编辑",
				value: data.roleName
			}, function(value, index) {
				obj.update({
					roleName: value
				});
				layer.close(index);
			});
		}
	});
	
	/**
	 * 添加
	 */
	$("#btn_add").click(function(){
		layer.prompt({
			formType: 0,
			title:"请输入要添加的角色名称",
			btn:"添加",
		}, function(value, index) {
			/* ajax 请求添加 */
			layer.msg(value);
			layer.close(index);
		});
	});
	
});

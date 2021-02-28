layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/tags.json',
		toolbar: '#tableToolbar' , //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
				type: 'checkbox',
				fixed: 'left'
			}, {
				field: 'tagId',
				title: '公告ID',
				width: 120,
				fixed: 'left',
				unresize: true,
				sort: true
			}, {
				field: 'tagName',
				title: '公告内容',
				width: 400,
				edit: 'text'
			}, {
				field: 'tagName',
				title: '发布用户',
				width: 120,
				edit: 'text'
			},
			{
				field: 'tagName',
				title: '发布时间',
				width: 200,
				edit: 'text'
			},
			{
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
				formType: 2,
				title:"编辑",
				value: data.tagName
			}, function(value, index) {
				obj.update({
					tagName: value
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
			formType: 2,
			title:"请输入要发布的内容",
			btn:"发布",
		}, function(value, index) {
			/* ajax  */
			layer.msg(value);
			layer.close(index);
		});
	});
	
	/**
	 * 搜索
	 */
	$("#btn_search").click(function(){
		layer.prompt({
			formType: 0,
			title:"请输入搜索关键字",
			btn:"搜索",
		}, function(value, index) {
			/* ajax 请求搜索 */
			layer.msg(value);
			layer.close(index);
		});
	});
});

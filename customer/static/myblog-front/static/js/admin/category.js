layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染分类表格数据
	table.render({
		elem: '#categoryTable',
		url: '../../../static/api/category.json',
		toolbar: '#categoryTableToolbar' , //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
				type: 'checkbox',
				fixed: 'left'
			}, {
				field: 'categoryId',
				title: '分类ID',
				width: 200,
				fixed: 'left',
				unresize: true,
				sort: true
			}, {
				field: 'categoryName',
				title: '分类名',
				width: 400,
				edit: 'text'
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#categoryTableBar',
				width: 150
			}]
		],
		page: true
	});

	//头工具栏事件
	table.on('toolbar(categoryTable)', function(obj) {
		var checkStatus = table.checkStatus(obj.config.id);
		switch (obj.event) {
			case 'deleteSelected':
				var data = checkStatus.data;
				layer.alert(JSON.stringify(data));
				break;
		};
	});

	//监听行工具事件
	table.on('tool(categoryTable)', function(obj) {
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
				value: data.categoryName
			}, function(value, index) {
				obj.update({
					categoryName: value
				});
				layer.close(index);
			});
		}
	});
	
	/**
	 * 添加分类
	 */
	$("#btn_category_add").click(function(){
		layer.prompt({
			formType: 0,
			title:"请输入要添加的分类名称",
			btn:"添加",
		}, function(value, index) {
			/* ajax 请求添加分类 */
			layer.msg(value);
			layer.close(index);
		});
	});
	
	/**
	 * 搜索分类
	 */
	$("#btn_category_search").click(function(){
		layer.prompt({
			formType: 0,
			title:"请输入搜索关键字",
			btn:"搜索",
		}, function(value, index) {
			/* ajax 请求搜索分类 */
			layer.msg(value);
			layer.close(index);
		});
	});
});

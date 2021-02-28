layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/blog.json',
		toolbar: '#tableToolbar', //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
					type: 'checkbox',
					fixed: 'left'
				},
				{
					field: 'id',
					title: '博客ID',
					width: 120,
					fixed: 'left',
					sort: true
				},
				{
					field: 'categoryName',
					title: '博客分类',
					width: 100,
					templet: function(data) {
						return '<button class="layui-btn layui-btn-xs layui-btn-primary">' + data.category.categoryName +
							'</button>';
					}
				},
				{
					field: 'title',
					title: '博客标题',
					width: 200
				},
				{
					field: 'author',
					title: '作者',
					width: 100,
					templet: function(data) {
						return data.user.userName;
					}
				},
				{
					field: 'isPublish',
					title: '发布状态',
					width: 114,
					sort: true,
					templet: function(data) {
						return data.isPublish ? '<button class="layui-btn layui-btn-xs layui-btn-normal">已发布</button>' :
							'<button class="layui-btn layui-btn-xs layui-btn-primary">草稿</button>';
					}
				},
				{
					field: 'isOriginal',
					title: '博客类型',
					width: 114,
					sort: true,
					templet: function(data) {
						return data.isOriginal ? '<button class="layui-btn layui-btn-xs">原创</button>' :
							'<button class="layui-btn layui-btn-xs layui-btn layui-btn-danger">转载</button>';
					}
				},
				{
					field: 'reprintUrl',
					title: '转载URL',
					width: 200
				},
				{
					field: 'isPublic',
					title: '是否公开',
					width: 114,
					sort: true,
					templet: function(data) {
						return data.isPublic ? '<button class="layui-btn layui-btn-xs btn-color-bgreen">公开</button>' :
							'<button class="layui-btn layui-btn-xs layui-btn-primary">私有</button>';
					}
				},
				{
					field: 'isTop',
					title: '是否置顶',
					width: 114,
					sort: true,
					templet: function(data) {
						return data.isTop ? '<button class="layui-btn layui-btn-xs btn-color-lgreen">置顶</button>' :
							'<button class="layui-btn layui-btn-xs layui-btn-primary">不置顶</button>';
					}
				},
				{
					field: 'isRecommend',
					title: '是否推荐',
					width: 114,
					sort: true,
					templet: function(data) {
						return data.isRecommend ? '<button class="layui-btn layui-btn-xs layui-btn-warm">推荐</button>' :
							'<button class="layui-btn layui-btn-xs layui-btn-primary">不推荐</button>';
					}
				},
				{
					field: 'createTime',
					title: '发表时间',
					width: 200,
					sort: true
				},
				{
					field: 'updateTime',
					title: '更新时间',
					width: 200,
					sort: true
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
		// console.log(obj)
		if (obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		} else if (obj.event === 'edit') {
			//将要编辑的数据保存到本地存储，以便在发布页面的能够从中读取数据
			layui.sessionData("blogCache", {
				key: 'blog',
				value: obj.data,
			});
			//跳转编辑页面(即博客发布页面，发布页面再读取本地缓存数据填充编辑器)
			parent.window.location.hash = "#/page/blog-editor.html";
			//改变hash在通过location.href跳转不了，只能重新加载的方式来跳转
			parent.window.location.reload();
		}
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

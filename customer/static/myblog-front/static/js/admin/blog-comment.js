layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/comments.json',
		toolbar: '#tableToolbar', //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
					type: 'checkbox',
					fixed: 'left'
				},
				{
					field: 'commentId',
					title: '评论ID',
					width: 100,
					fixed: 'left',
					sort: true
				},
				{
					field: 'userName',
					title: '评论者',
					width: 100,
					templet: function(data) {
						return data.user.userName;
					}
				},
				{
					field: 'content',
					title: '评论内容',
					width: 260
				},
				{
					field: 'blogTitle',
					title: '评论博客',
					width: 220,
					templet: function(data) {
						return data.blog.title;
					}
				},
				{
					field: 'parentId',
					title: '父评论ID',
					width: 120,
					sort:true
				},
				{
					field: 'commentTime',
					title: '评论时间',
					width: 180,
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
		page: true,
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
		//获取编辑行数据
		var data = obj.data;
		// console.log(obj)
		if (obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		} else if (obj.event === 'edit') {
			layer.open({
				type: 1,
				content: $("#userEditPopup").html(),
				title: "编辑",
				btn: ['保存'],
				anim: 1,
				area: ['420px', '300px'],
				//保存
				yes: function(index) {
					data["role"]["roleId"]=$("#role").val();
					data["role"]["roleName"]=$("#role :selected").text();
					
					data["isLock"]=$("#isLock")[0].checked;
					/* ajax请求服务端 */
					console.log(data);
					
					
					layer.close(index);
					// location.reload();
				},
				//弹窗弹出后执行的回调函数，可以用来初始化一些控件元素
				success: function() {
					//初始化下拉选项框的值
					//从数据库中获取
					$.getJSON("../../../static/api/role.json",function(result){
						var role=result.data;
						for(i =0; i<role.length;i++){
							$("#role").append('<option value="'+role[i].roleId+'">'+role[i].roleName+'</option>');
						}
						//填充弹窗表单
						$("#role").val(data.role.roleId);
						$("#isLock").attr('checked', data.isLock);
						//重新渲染样式
						form.render();
					});
				}
			});
		}
	});



	/**
	 * 搜索id
	 */
	$("#btn_search_by_id").click(function() {
		layer.prompt({
			formType: 0,
			title: "请输入用户ID",
			btn: "搜索",
		}, function(value, index) {
			/* ajax 请求搜索 */
			layer.msg(value);
			layer.close(index);
		});
	});
	
	/**
	 * 搜索用户名
	 */
	$("#btn_search_by_username").click(function() {
		layer.prompt({
			formType: 0,
			title: "请输入用户名关键字",
			btn: "搜索",
		}, function(value, index) {
			/* ajax 请求搜索 */
			layer.msg(value);
			layer.close(index);
		});
	});
});

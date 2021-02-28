layui.use(['element', 'jquery', 'layer', 'form', 'table'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//渲染表格数据
	table.render({
		elem: '#dataTable',
		url: '../../../static/api/links.json',
		toolbar: '#tableToolbar', //开启头部工具栏，并为其绑定左侧模板
		height:550,
		cols: [
			[{
				type: 'checkbox',
				fixed: 'left'
			}, {
				field: 'id',
				title: 'ID',
				width: 120,
				fixed: 'left',
				unresize: true,
				sort: true
			}, {
				field: 'linkName',
				title: '链接名称',
				width: 250,
			}, {
				field: 'url',
				title: 'URL',
				width: 400,
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
			case 'deleteSelected':   //删除选中
				var data = checkStatus.data;
				layer.alert(JSON.stringify(data));
				break;
			case 'add':  //添加
				addOrEdit("add",null);
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
			addOrEdit("edit",data);
		}
	});

	
	/**
	 * 添加或编辑
	 * @param {Object} event 操作事件
	 * @param {Object} data  数据对象{}
	 */
	function addOrEdit(event,data){
		layer.open({
			type: 1,
			content: '<div style="margin:10px">'
				+'链接名称<input type="text" id="linkName" placeholder="请输入链接名称" autocomplete="off" class="layui-input">'
				+'<br>URL<input type="text" id="url" placeholder="请输入URL" autocomplete="off" class="layui-input">'
				+'</div>',
			title: event==='add'?'添加':'编辑',
			btn: '提交',
			anim: 1,
			area: ['350px', '250px'],
			yes: function(index) {
				var linkName=$("#linkName").val();
				var url=$("#url").val();
				if(linkName.length==0||url.length==0)
					return ;
				var link={
					"id":data==null?"":data.id,
					"linkName":$("#linkName").val(),
					"url":$("#url").val()
				};
				if(event==="add"){
					layer.alert(JSON.stringify(link));
					//ajax
				}
				else{
					layer.alert(JSON.stringify(link));
					//ajax
				}
				
				layer.close(index);
			},
			success:function(){
				if(data!=null){
					$("#linkName").val(data.linkName);
					$("#url").val(data.url);
				}
			}
		});
	}

});

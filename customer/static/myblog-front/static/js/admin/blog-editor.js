layui.use(['element', 'jquery', 'layer', 'form'], function() {
	var element = layui.element,
		$ = layui.jquery,
		form = layui.form,
		layer = layui.layer;

	//执行填充编辑器操作，主要用于文章的编辑
	fillUpEditor();

	/**
	 * 监听博客发布按钮
	 */
	$("#btn-saveblog").click(function() {
		//获取编辑器的内容
		var content = window.mdEditor.getHTML();
		var title = $("#title").val();
		if (content.length == 0 || title.length == 0) {
			layer.msg("标题或正文不能为空哦！", {
				icon: 5,
				anim: 6
			});
			return;
		}
		layer.open({
			type: 1,
			content: $("#blogPublishPopup").html(),
			title: "发布文章",
			btn: ['直接发布', '保存草稿'],
			anim: 1,
			area: ['690px', '400px'],
			maxmin: true,
			//直接发布按钮
			yes: function(index) {
				var data = {}
				if (!publishOrSaveBlog(data))
					return;
				//设置发布字段为true
				data["isPublish"] = true;
				layer.alert(JSON.stringify(data));
				/* ajax请求服务端 */

				//清空本地缓存
				layui.sessionData("blogCache", null);
				layer.close(index);
				// location.reload();
			},
			//保存按钮
			btn2: function() {
				var data = {}
				if (!publishOrSaveBlog(data))
					return;
				//设置发布字段为false
				data["isPublish"] = false;
				layer.alert(JSON.stringify(data));
				saveBlogTolocal(data);
				/* ajax请求服务端 */
			},
			//弹窗弹出后执行的回调函数，可以用来初始化一些控件元素
			success: function() {
				form.render();
				//填充弹窗表单
				fillPopup();
				//渲染发布弹窗
				form.render();
			}
		});
	});


	/**
	 * 监听博客类型下拉列表框
	 */
	form.on('select(blogType)', function(data) {
		// console.log(data.value); 得到被选中的值
		var value = data.value;
		if (value === "0") {
			$("#reprintUrl").show();
		} else {
			$("#reprintUrl").hide();
			$("#reprintUrl").val("");
		}
	});


	/**
	 * 发布或保存博客，用data接收所有的值封装
	 * @param {Object} data
	 */
	function publishOrSaveBlog(data) {
		var tags = [],
			category = {};
		data["title"] = $("#title").val();
		data["contentHtml"] = window.mdEditor.getHTML(); // 获取 Textarea 保存的 HTML 源码
		data["contentMd"] = window.mdEditor.getMarkdown(); // 获取 Markdown 源码
		//获取分类
		var categoryId = $("#category").val();
		if (category == "" || category.length == 0) { //非空判断
			layer.msg("必须要选择一个分类哦！", {
				icon: 0,
				anim: 6
			});
			return false;
		}
		category["categoryId"] = categoryId;
		//获取标签,放入标签数组
		for (var i = 1; i <= 3; i++) {
			var tag={};
			tag["tagId"] = $("#tag" + i).val();
			tags.push(tag);
		}

		//获取博客类型
		var isOriginal = $("#isOriginal").val();
		if (isOriginal == "" || isOriginal == null) { //非空判断
			layer.msg("博客类型还是要滴！", {
				icon: 0,
				anim: 6
			});
			return false;
		}
		//获取发布类型开关值
		var isPublic = $("#isPublic")[0].checked;
		//获取置顶开关值
		var isTop = $("#isTop")[0].checked;
		//获取推荐开关值
		var isRecommend = $("#isRecommend")[0].checked;
		data["category"] = category;
		data["isOriginal"] = isOriginal == 1 ? true : false;
		data["reprintUrl"] = $("#reprintUrl").val();
		data["isPublic"] = isPublic;
		data["isTop"] = isTop;
		data["isRecommend"] = isRecommend;
		data["tags"] = tags;
		return true;
	}

	/**
	 * 暂时保存博客数据到本地localStorage持久化存储
	 * @param {Object} data
	 */
	function saveBlogTolocal(data) {
		layui.sessionData("blogCache", {
			key: 'blog',
			value: data
		});
	}

	/**
	 * 填充博客发布页面，主要用于读取保存草稿箱的博客到编辑器(如果有的话)
	 */
	function fillUpEditor() {
		//读取浏览器本地会话存储
		var blog = layui.sessionData("blogCache").blog;
		if (blog == null)
			return;
		console.log(blog);
		$("#title").val(blog.title);
		$("#content-editormd-markdown-doc").val(blog.contentMd);
	}
	
	
	/**
	 * 填充发布弹窗 , 主要用于读取保存草稿箱的博客到编辑器(如果有的话)
	 */
	function fillPopup() {
		//读取浏览器本地会话存储
		var blog = layui.sessionData("blogCache").blog;
		if (blog == null)
			return;
		$("#category").val(blog.category.categoryId);

		for (var i = 0; i < 3; i++) {
			$("#tag" + (i+1)).val(blog.tags[i].tagId);
		}
		$("#isOriginal").val(blog.isOriginal ? '1' : '0');
		if (!blog.isOriginal) {
			$("#reprintUrl").show();
			$("#reprintUrl").val(blog.reprintUrl);
		}
		$("#isPublic").attr("checked", blog.isPublic);
		$("#isTop").attr('checked', blog.isTop);
		$("#isRecommend").attr("checked", blog.isRecommend);
	}
});

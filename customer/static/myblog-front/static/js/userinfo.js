layui.use(['element','jquery','layer','form','upload'], function() {
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage,
		util = layui.util,
		form = layui.form,
		upload = layui.upload,
		layer = layui.layer;
	
	var enableCancel=false;
	$("#modify-btn").click(function(){
		if(enableCancel){
			$("input[name='userName']").attr("readonly","readonly");
			$("input[name='email']").attr("readonly","readonly");
			$("input[name='userPassword']").attr("readonly","readonly");
			$("textarea[name='signature']").attr("readonly","readonly");
			$("#update-btn").addClass("layui-btn-disabled").attr("disabled","disabled");
			$("#modify-btn").removeClass("layui-btn-primary").text("修改");
			enableCancel=false;
		}else{
			$("input[name='userName']").removeAttr("readonly");
			$("input[name='email']").removeAttr("readonly");
			$("input[name='userPassword']").removeAttr("readonly");
			$("textarea[name='signature']").removeAttr("readonly");
			$("#update-btn").removeClass("layui-btn-disabled").removeAttr("disabled");
			$("#modify-btn").addClass("layui-btn-primary").text("取消");
			enableCancel=true;
		}
	});

	 //监听提交
	form.on('submit(update-btn)',function(data){
		$.ajax({
			url:'/user/'
		});
		 layer.alert(JSON.stringify(data.field), {
		      title: '登录提交的信息'
		    });
		
		//关闭表单跳转		
		return false;
	});
	
	form.verify({
	    pass: [
	      /^[\S]{6,12}$/
	      ,'密码必须6到12位，且不能出现空格'
	    ]
	  });
	  
	  
	  //头像上传
	   var uploadInst = upload.render({
	     elem: '#upload-avatar'
	     ,url: '/upload/avatar' //改成您自己的上传接口
	     ,before: function(obj){
	       //预读本地文件示例，不支持ie8
	       obj.preview(function(index, file, result){
	         $('#avatar').attr('src', result); //图片链接（base64）
	       });
	     }
	     ,done: function(res){
	       //如果上传失败
	       if(res.code > 0){
	         return layer.msg('上传失败');
	       }
	       //上传成功
	     }
	     ,error: function(){
	       //演示失败状态，并实现重传
	       var demoText = $('#upload-msg');
	       demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs upload-reload">重试</a>');
	       demoText.find('.upload-reload').on('click', function(){
	         uploadInst.upload();
	       });
	     }
	   });
});
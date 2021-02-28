layui.use(['element', 'jquery', 'laypage', 'util','layer','form'], function() {
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage,
		util = layui.util,
		form = layui.form,
		layer = layui.layer;

	//监听提交
	form.on('submit(btn-register)',function(data){
		 layer.alert(JSON.stringify(data.field), {
		      title: '注册提交的信息'
		    });
		//关闭表单跳转		
		return false;
	});
	
	//自定义验证规则
	  form.verify({
	    username: function(value){
	      if(value.length < 5){
	        return '标题至少得5个字符啊';
	      }
	    }
	    ,cpassword: function(value){
			if(!(value===$("#L_password").val())){
				return "两次密码不一致！";
			}
		}
		
	  });
});
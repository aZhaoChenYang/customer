layui.use(['element', 'layedit', 'jquery', 'layer', 'form'], function() {
	var element = layui.element,
		layedit = layui.layedit,
		$ = layui.jquery,
		form = layui.form,
		layer = layui.layer;

	//构建一个默认的编辑器
	var index = layedit.build('blog-editor',{
		height:150,
		tool:['face', '|', 'left', 'center', 'right','|','link']
	});
	
	// alert(layedit.getContent(index)); //获取编辑器内容

	$('#btn-submit-message').on('click', function() {
		var email=$("#email").val();
		var nickname=$("#nickname").val();
		layer.alert("邮箱为"+email+"的"+nickname+"说："+layedit.getContent(index));
	});

});

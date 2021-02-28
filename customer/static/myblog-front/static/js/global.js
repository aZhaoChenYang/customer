layui.use(['element', 'layedit', 'jquery', 'layer', 'form'], function() {
	var element = layui.element,
		layedit = layui.layedit,
		$ = layui.jquery,
		form = layui.form,
		layer = layui.layer;

	//构建一个默认的编辑器
	var index = layedit.build('blog-editor', {
		height: 150,
		tool: ['face', '|', 'left', 'center', 'right', '|', 'link']
	});

	// alert(layedit.getContent(index)); //获取编辑器内容
	//提交评论或留言
	$('#btn-submit-message').on('click', function() {
		var email = $("#email").val();
		var nickname = $("#nickname").val();
		layer.alert("邮箱为" + email + "的" + nickname + "说：" + layedit.getContent(index));
	});

	/* 向下滚动时导航条固定 */
	var navOffset = $(".blog-header").offset().top;
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop();
		if (scrollPos > navOffset) {
			$(".blog-header").addClass("fixed");

		} else {
			$(".blog-header").removeClass("fixed");
		}
	});

	//评论点击回复按钮的事件
	window.reply = function(toUserId, toUserName) {
		var reply_idex;
		layer.open({
			type: 1,
			content: '<div style="margin:10px"><textarea class="layui-textarea" id="reply" style="display: none;"></textarea></div>',
			title: "正在回复" + toUserName,
			btn: '提交',
			anim: 1,
			area: ['500px', '320px'],
			maxmin: true,
			yes: function() {
				layer.msg(toUserId + ":" + toUserName + "说：" + layedit.getContent(reply_idex), {
					icon: 6
				});
			},
			success: function() {
				//初始化回复文本框
				reply_idex = layedit.build('reply', {
					height: 150,
					tool: ['face', 'link']
				});
			}
		});
	};

	//移动端点击显示侧边导航栏
	$("#mobile_show_nav").click(function() {
		$("#nav_left").addClass("layui-nav-tree layui-nav-side mobile-nav-left").show().animate({
			left: '0px'
		});
		$(".shadow").show();
		//禁止页面滚动
		var top = $(document).scrollTop();
		$(document).scroll(function() {
			$(document).scrollTop(top);
		});
		$(".shadow").on("touchmove", function(event) {
			event.preventDefault()
		}, false)

	});

	//点击遮罩层收回侧边导航栏
	$(".shadow").click(function() {
		$("#nav_left").removeClass("layui-nav-tree layui-nav-side mobile-nav-left").hide();
		$(".shadow").hide();
		//恢复滚动
		$(document).unbind("scroll");
		$(".shadow").unbind("touchmove");
	});
});

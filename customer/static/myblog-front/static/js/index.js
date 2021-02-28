layui.use(['element', 'jquery', 'laypage', 'util','layer'], function() {
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage,
		util = layui.util,
		layer = layui.layer;

/* 	时钟
	setInterval(function() {
		$("#systemtime").text(util.toDateString(new Date(), "yyyy年MM月dd日 HH:mm:ss"));
	}, 500);
 */

	var tips;
	$('#qq').on({
		mouseover: function() {
			tips = layer.tips(
				'<img src="../static/images/qq.jpg" style="width:110px;height:110px;"/>',
				this, {
					tips: 1,
					time: 0
				})
		},
		mouseout: function() {
			layer.close(tips);
		}
	});

	$('#wechat').on({
		mouseover: function() {
			tips = layer.tips(
				'123456789',
				this, {
					tips: 1,
					time: 0
				})
		},
		mouseout: function() {
			layer.close(tips);
		}
	})
	$('#lm').on({
		mouseover: function() {
			tips = layer.tips('有什么想对我说嘛~', this, {
				tips: 1,
				time: 0
			})
		},
		mouseout: function() {
			layer.close(tips);
		}
	})
	$('#github').on({
		mouseover: function() {
			tips = layer.tips('去我的GitHUb~', this, {
				tips: 1,
				time: 0
			})
		},
		mouseout: function() {
			layer.close(tips);
		}
	})

});

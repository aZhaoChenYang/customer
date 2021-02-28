layui.use(['element', 'jquery','laypage'], function() {
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage;

	/* 获取随机字体大小 */
	function getRandomFontSize(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	/* 获取随机颜色 */
	function getRandomColor() {
		var str = Math.ceil(Math.random() * 16777215).toString(16);
		if (str.length < 6) {
			str = "0" + str;
		}
		return str;
	}

	/* 对首页标签板块着色 */
	var obj = $("#tags a");
	for (var i = 0; i < obj.length; i++) {
		obj[i].style.fontSize = getRandomFontSize(15, 22) + "px";
		obj[i].style.color = "#" + getRandomColor();
	}

	/* 分页 */
	laypage.render({
		elem: 'page-util',
		count: 100,
		jump: function(obj) {
			console.log(obj)
			console.log(obj.curr);
			console.log(obj.limit)
		}
	});
});

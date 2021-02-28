layui.define(["jquery","layer"],function(a){var c=layui.$,b=layui.layer;var d={config:function(e){var f=[{headerRightBg:"#ffffff",headerRightBgThis:"#e4e4e4",headerRightColor:"rgba(107, 107, 107, 0.7)",headerRightChildColor:"rgba(107, 107, 107, 0.7)",headerRightColorThis:"#565656",headerRightNavMore:"rgba(160, 160, 160, 0.7)",headerRightNavMoreBg:"#1E9FFF",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#565656",headerLogoBg:"#192027",headerLogoColor:"rgb(191, 187, 187)",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#28333E",leftMenuBgThis:"#1E9FFF",leftMenuChildBg:"#0c0f13",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#1e9fff",},{headerRightBg:"#23262e",headerRightBgThis:"#0c0c0c",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#1aa094",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#0c0c0c",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#23262e",leftMenuBgThis:"#737373",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#23262e",},{headerRightBg:"#ffa4d1",headerRightBgThis:"#bf7b9d",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#ffa4d1",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#e694bd",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#1f1f1f",leftMenuBgThis:"#737373",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#ffa4d1",},{headerRightBg:"#1aa094",headerRightBgThis:"#197971",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#1aa094",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#0c0c0c",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#23262e",leftMenuBgThis:"#1aa094",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#1aa094",},{headerRightBg:"#1e9fff",headerRightBgThis:"#0069b7",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#1e9fff",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#0c0c0c",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#1f1f1f",leftMenuBgThis:"#1e9fff",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#1e9fff",},{headerRightBg:"#ffb800",headerRightBgThis:"#d09600",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#d09600",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#243346",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#2f4056",leftMenuBgThis:"#8593a7",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#ffb800",},{headerRightBg:"#e82121",headerRightBgThis:"#ae1919",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#ae1919",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#0c0c0c",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#1f1f1f",leftMenuBgThis:"#3b3f4b",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#e82121",},{headerRightBg:"#963885",headerRightBgThis:"#772c6a",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#772c6a",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#243346",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#2f4056",leftMenuBgThis:"#586473",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#963885",},{headerRightBg:"#2D8CF0",headerRightBgThis:"#0069b7",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#0069b7",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#0069b7",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#1f1f1f",leftMenuBgThis:"#2D8CF0",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#2d8cf0",},{headerRightBg:"#ffb800",headerRightBgThis:"#d09600",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#d09600",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#d09600",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#2f4056",leftMenuBgThis:"#3b3f4b",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#ffb800",},{headerRightBg:"#e82121",headerRightBgThis:"#ae1919",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#ae1919",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#d91f1f",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#1f1f1f",leftMenuBgThis:"#3b3f4b",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#e82121",},{headerRightBg:"#963885",headerRightBgThis:"#772c6a",headerRightColor:"rgba(255,255,255,.7)",headerRightChildColor:"#676767",headerRightColorThis:"#ffffff",headerRightNavMore:"rgba(255,255,255,.7)",headerRightNavMoreBg:"#772c6a",headerRightNavMoreColor:"#ffffff",headerRightToolColor:"#bbe3df",headerLogoBg:"#772c6a",headerLogoColor:"#ffffff",leftMenuNavMore:"rgb(191, 187, 187)",leftMenuBg:"#2f4056",leftMenuBgThis:"#626f7f",leftMenuChildBg:"rgba(0,0,0,.3)",leftMenuColor:"rgb(191, 187, 187)",leftMenuColorThis:"#ffffff",tabActiveColor:"#963885",}];
if(e===undefined){return f}else{return f[e]}},render:function(f){f.bgColorDefault=f.bgColorDefault||false;f.listen=f.listen||false;var e=sessionStorage.getItem("layuiminiBgcolorId");if(e===null||e===undefined||e===""){e=f.bgColorDefault}d.buildThemeCss(e);if(f.listen){d.listen(f)}},buildThemeCss:function(e){if(!e){return false}var g=d.config(e);var f="/*头部右侧背景色 headerRightBg */\n"+".layui-layout-admin .layui-header {\n"+"    background-color: "+g.headerRightBg+" !important;\n"+"}\n"+"\n"+"/*头部右侧选中背景色 headerRightBgThis */\n"+".layui-layout-admin .layui-header .layuimini-header-content > ul > .layui-nav-item.layui-this, .layuimini-tool i:hover {\n"+"    background-color: "+g.headerRightBgThis+" !important;\n"+"}\n"+"\n"+"/*头部右侧字体颜色 headerRightColor */\n"+".layui-layout-admin .layui-header .layui-nav .layui-nav-item a {\n"+"    color:  "+g.headerRightColor+";\n"+"}\n"+"/**头部右侧下拉字体颜色 headerRightChildColor */\n"+".layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child a {\n"+"    color:  "+g.headerRightChildColor+"!important;\n"+"}\n"+"\n"+"/*头部右侧鼠标选中 headerRightColorThis */\n"+".layui-header .layuimini-menu-header-pc.layui-nav .layui-nav-item a:hover, .layui-header .layuimini-header-menu.layuimini-pc-show.layui-nav .layui-this a {\n"+"    color: "+g.headerRightColorThis+" !important;\n"+"}\n"+"\n"+"/*头部右侧更多下拉颜色 headerRightNavMore */\n"+".layui-header .layui-nav .layui-nav-more {\n"+"    border-top-color: "+g.headerRightNavMore+" !important;\n"+"}\n"+"\n"+"/*头部右侧更多下拉颜色 headerRightNavMore */\n"+".layui-header .layui-nav .layui-nav-mored, .layui-header .layui-nav-itemed > a .layui-nav-more {\n"+"    border-color: transparent transparent "+g.headerRightNavMore+" !important;\n"+"}\n"+"\n"+"/**头部右侧更多下拉配置色 headerRightNavMoreBg headerRightNavMoreColor */\n"+".layui-header .layui-nav .layui-nav-child dd.layui-this a, .layui-header .layui-nav-child dd.layui-this, .layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child .layui-this a {\n"+"    background-color: "+g.headerRightNavMoreBg+" !important;\n"+"    color:"+g.headerRightNavMoreColor+" !important;\n"+"}\n"+"\n"+"/*头部缩放按钮样式 headerRightToolColor */\n"+".layui-layout-admin .layui-header .layuimini-tool i {\n"+"    color: "+g.headerRightToolColor+";\n"+"}\n"+"\n"+"/*logo背景颜色 headerLogoBg */\n"+".layui-layout-admin .layuimini-logo {\n"+"    background-color: "+g.headerLogoBg+" !important;\n"+"}\n"+"\n"+"/*logo字体颜色 headerLogoColor */\n"+".layui-layout-admin .layuimini-logo h1 {\n"+"    color: "+g.headerLogoColor+";\n"+"}\n"+"\n"+"/*左侧菜单更多下拉样式 leftMenuNavMore */\n"+".layuimini-menu-left .layui-nav .layui-nav-more,.layuimini-menu-left-zoom.layui-nav .layui-nav-more {\n"+"    border-top-color: "+g.leftMenuNavMore+";\n"+"}\n"+"\n"+"/*左侧菜单更多下拉样式 leftMenuNavMore */\n"+".layuimini-menu-left .layui-nav .layui-nav-mored, .layuimini-menu-left .layui-nav-itemed > a .layui-nav-more,   .layuimini-menu-left-zoom.layui-nav .layui-nav-mored, .layuimini-menu-left-zoom.layui-nav-itemed > a .layui-nav-more {\n"+"    border-color: transparent transparent  "+g.leftMenuNavMore+" !important;\n"+"}\n"+"\n"+"/*左侧菜单背景 leftMenuBg */\n"+".layui-side.layui-bg-black, .layui-side.layui-bg-black > .layuimini-menu-left > ul, .layuimini-menu-left-zoom > ul {\n"+"    background-color:  "+g.leftMenuBg+" !important;\n"+"}\n"+"\n"+"/*左侧菜单选中背景 leftMenuBgThis */\n"+".layuimini-menu-left .layui-nav-tree .layui-this, .layuimini-menu-left .layui-nav-tree .layui-this > a, .layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this, .layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this a, .layuimini-menu-left-zoom.layui-nav-tree .layui-this, .layuimini-menu-left-zoom.layui-nav-tree .layui-this > a, .layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this, .layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this a {\n"+"    background-color: "+g.leftMenuBgThis+" !important\n"+"}\n"+"\n"+"/*左侧菜单子菜单背景 leftMenuChildBg */\n"+".layuimini-menu-left .layui-nav-itemed > .layui-nav-child{\n"+"    background-color: "+g.leftMenuChildBg+" !important;\n"+"}\n"+"\n"+"/*左侧菜单字体颜色 leftMenuColor */\n"+".layuimini-menu-left .layui-nav .layui-nav-item a, .layuimini-menu-left-zoom.layui-nav .layui-nav-item a {\n"+"    color:  "+g.leftMenuColor+" !important;\n"+"}\n"+"\n"+"/*左侧菜单选中字体颜色 leftMenuColorThis */\n"+".layuimini-menu-left .layui-nav .layui-nav-item a:hover, .layuimini-menu-left .layui-nav .layui-this a, .layuimini-menu-left-zoom.layui-nav .layui-nav-item a:hover, .layuimini-menu-left-zoom.layui-nav .layui-this a {\n"+"    color:"+g.leftMenuColorThis+" !important;\n"+"}\n"+"\n"+"/**tab选项卡选中颜色 tabActiveColor */\n"+".layuimini-tab .layui-tab-title .layui-this .layuimini-tab-active {\n"+"    background-color: "+g.tabActiveColor+";\n"+"}\n";c("#layuimini-bg-color").html(f)},buildBgColorHtml:function(f){f.bgColorDefault=f.bgColorDefault||0;var e=parseInt(sessionStorage.getItem("layuiminiBgcolorId"));if(isNaN(e)){e=f.bgColorDefault}var h=d.config();
var g="";c.each(h,function(i,j){if(i===e){g+='<li class="layui-this" data-select-bgcolor="'+i+'">\n'}else{g+='<li  data-select-bgcolor="'+i+'">\n'}g+='<a href="javascript:;" data-skin="skin-blue" style="" class="clearfix full-opacity-hover">\n'+'<div><span style="display:block; width: 20%; float: left; height: 12px; background: '+j.headerLogoBg+';"></span><span style="display:block; width: 80%; float: left; height: 12px; background: '+j.headerRightBg+';"></span></div>\n'+'<div><span style="display:block; width: 20%; float: left; height: 40px; background: '+j.leftMenuBg+';"></span><span style="display:block; width: 80%; float: left; height: 40px; background: #ffffff;"></span></div>\n'+"</a>\n"+"</li>"});return g},listen:function(e){c("body").on("click","[data-bgcolor]",function(){var i=b.load(0,{shade:false,time:2*1000});var f=(document.documentElement.clientHeight)-60;var h=d.buildBgColorHtml(e);var g='<div class="layuimini-color">\n'+'<div class="color-title">\n'+"<span>配色方案</span>\n"+"</div>\n"+'<div class="color-content">\n'+"<ul>\n"+h+"</ul>\n"+"</div>\n"+'<div class="more-menu-list">\n'+'<a class="more-menu-item" href="http://layuimini.99php.cn/docs/index.html" target="_blank"><i class="layui-icon layui-icon-read" style="font-size: 19px;"></i> 开发文档</a>\n'+'<a class="more-menu-item" href="https://github.com/zhongshaofa/layuimini" target="_blank"><i class="layui-icon layui-icon-tabs" style="font-size: 16px;"></i> 开源地址</a>\n'+'<a class="more-menu-item" href="http://layuimini.99php.cn" target="_blank"><i class="layui-icon layui-icon-theme"></i> 官方网站</a>\n'+"</div>"+"</div>";b.open({type:1,title:false,closeBtn:0,shade:0.2,anim:2,shadeClose:true,id:"layuiminiBgColor",area:["340px",f+"px"],offset:"rb",content:g,success:function(k,j){},end:function(){c(".layuimini-select-bgcolor").removeClass("layui-this")}});b.close(i)});c("body").on("click","[data-select-bgcolor]",function(){var f=c(this).attr("data-select-bgcolor");c(".layuimini-color .color-content ul .layui-this").attr("class","");c(this).attr("class","layui-this");sessionStorage.setItem("layuiminiBgcolorId",f);d.render({bgColorDefault:f,listen:false,})})}};a("miniTheme",d)});
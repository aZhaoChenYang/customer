layui.define(["laypage","form"],function(e){var b=function(){this.v="1.1"},i="iconPickerFa",j=this,f=layui.jquery,c=layui.laypage,a=layui.form,g="body",h="请选择图标";b.prototype.render=function(k){var s=k,D=s.elem,m=s.url,n=s.page==null?true:s.page,C=s.limit==null?12:s.limit,q=s.search==null?true:s.search,A=s.cellWidth,z=s.click,p=s.success,G={},E=new Date().getTime(),l=f(D).val(),w="layui-select-title",u="layui-select-title-"+E,B="layui-iconpicker-"+E,v="layui-iconpicker-body-"+E,y="layui-iconpicker-page-"+E,o="layui-iconpicker-list-box",x="layui-form-selected",r="layui-unselect";var F={init:function(){G=t.getData(m);F.hideElem().createSelect().createBody().toggleSelect();F.preventEvent().inputListen();t.loadCss();if(p){p(this.successHandle())}return F},successHandle:function(){var H={options:s,data:G,id:E,elem:f("#"+B)};return H},hideElem:function(){f(D).hide();return F},createSelect:function(){var I='<i class="fa">';if(l===""){l="fa-adjust"}I='<i class="fa '+l+'">';I+="</i>";var H='<div class="layui-iconpicker layui-unselect layui-form-select" id="'+B+'">'+'<div class="'+w+'" id="'+u+'">'+'<div class="layui-iconpicker-item">'+'<span class="layui-iconpicker-icon layui-unselect">'+I+"</span>"+'<i class="layui-edge"></i>'+"</div>"+"</div>"+'<div class="layui-anim layui-anim-upbit" style="">'+"123"+"</div>";f(D).after(H);return F},toggleSelect:function(){var H="#"+u+" .layui-iconpicker-item,#"+u+" .layui-iconpicker-item .layui-edge";F.event("click",H,function(J){var I=f("#"+B);if(I.hasClass(x)){I.removeClass(x).addClass(r)}else{f(".layui-form-select").removeClass(x);I.addClass(x).removeClass(r)}J.stopPropagation()});return F},createBody:function(){var H="";if(q){H='<div class="layui-iconpicker-search">'+'<input class="layui-input">'+'<i class="layui-icon">&#xe615;</i>'+"</div>"}var I='<div class="layui-iconpicker-body" id="'+v+'">'+H+'<div class="'+o+'"></div> '+"</div>";f("#"+B).find(".layui-anim").eq(0).html(I);F.search().createList().check().page();return F},createList:function(V){var Q=G,J=Q.length,I="",P=f('<div class="layui-iconpicker-list">');var O=C,L=J%O===0?J/O:parseInt(J/O+1),T=y;var U=[];for(var N=0;N<J;N++){var M=Q[N];if(V&&M.indexOf(V)===-1){continue}var H="";if(A!==null){H+=' style="width:'+A+'"'}var S='<div class="layui-iconpicker-icon-item" title="'+M+'" '+H+">";S+='<i class="fa '+M+'"></i>';S+="</div>";U.push(S)}J=U.length;L=J%O===0?J/O:parseInt(J/O+1);for(var N=0;N<L;N++){var R=f('<div class="layui-iconpicker-icon-limit" id="layui-iconpicker-icon-limit-'+E+(N+1)+'">');for(var K=N*O;K<(N+1)*O&&K<J;K++){R.append(U[K])}P.append(R)}if(J===0){P.append('<p class="layui-iconpicker-tips">无数据</p>')}if(n){f("#"+v).addClass("layui-iconpicker-body-page");I='<div class="layui-iconpicker-page" id="'+y+'">'+'<div class="layui-iconpicker-page-count">'+'<span id="'+y+'-current">1</span>/'+'<span id="'+y+'-pages">'+L+"</span>"+' (<span id="'+y+'-length">'+J+"</span>)"+"</div>"+'<div class="layui-iconpicker-page-operate">'+'<i class="layui-icon" id="'+y+'-prev" data-index="0" prev>&#xe603;</i> '+'<i class="layui-icon" id="'+y+'-next" data-index="2" next>&#xe602;</i> '+"</div>"+"</div>"}f("#"+B).find(".layui-anim").find("."+o).html("").append(P).append(I);return F},preventEvent:function(){var H="#"+B+" .layui-anim";F.event("click",H,function(I){I.stopPropagation()});return F},page:function(){var H="#"+y+" .layui-iconpicker-page-operate .layui-icon";f(H).unbind("click");F.event("click",H,function(O){var L=O.currentTarget,K=parseInt(f("#"+y+"-pages").html()),M=f(L).attr("prev")!==undefined,J=parseInt(f(L).attr("data-index")),I=f("#"+y+"-current"),N=parseInt(I.html());if(M&&N>1){N=N-1;f(H+"[prev]").attr("data-index",N)}else{if(!M&&N<K){N=N+1;f(H+"[next]").attr("data-index",N)}}I.html(N);f("#"+B+" .layui-iconpicker-icon-limit").hide();f("#layui-iconpicker-icon-limit-"+E+N).show();O.stopPropagation()});return F},search:function(){var H="#"+v+" .layui-iconpicker-search .layui-input";F.event("input propertychange",H,function(K){var J=K.target,I=f(J).val();F.createList(I)});return F},check:function(){var H="#"+v+" .layui-iconpicker-icon-item";F.event("click",H,function(M){var L=f(M.currentTarget).find(".fa"),K="";var J=L.attr("class").split(/[\s\n]/),I=J[1],K=I;f("#"+u).find(".layui-iconpicker-item .fa").html("").attr("class",J.join(" "));f("#"+B).removeClass(x).addClass(r);f(D).val(K).attr("value",K);if(z){z({icon:K})}});return F},inputListen:function(){var H=f(D);F.event("change",D,function(){var I=H.val()});return F},event:function(H,J,I){f(g).on(H,J,I)}};var t={loadCss:function(){var I=".layui-iconpicker {max-width: 280px;}.layui-iconpicker .layui-anim{display:none;position:absolute;left:0;top:42px;padding:5px 0;z-index:899;min-width:100%;border:1px solid #d2d2d2;max-height:300px;overflow-y:auto;background-color:#fff;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12);box-sizing:border-box;}.layui-iconpicker-item{border:1px solid #e6e6e6;width:90px;height:38px;border-radius:4px;cursor:pointer;position:relative;}.layui-iconpicker-icon{border-right:1px solid #e6e6e6;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;width:60px;height:100%;float:left;text-align:center;background:#fff;transition:all .3s;}.layui-iconpicker-icon i{line-height:38px;font-size:18px;}.layui-iconpicker-item > .layui-edge{left:70px;}.layui-iconpicker-item:hover{border-color:#D2D2D2!important;}.layui-iconpicker-item:hover .layui-iconpicker-icon{border-color:#D2D2D2!important;}.layui-iconpicker.layui-form-selected .layui-anim{display:block;}.layui-iconpicker-body{padding:6px;}.layui-iconpicker .layui-iconpicker-list{background-color:#fff;border:1px solid #ccc;border-radius:4px;}.layui-iconpicker .layui-iconpicker-icon-item{display:inline-block;width:21.1%;line-height:36px;text-align:center;cursor:pointer;vertical-align:top;height:36px;margin:4px;border:1px solid #ddd;border-radius:2px;transition:300ms;}.layui-iconpicker .layui-iconpicker-icon-item i.layui-icon{font-size:17px;}.layui-iconpicker .layui-iconpicker-icon-item:hover{background-color:#eee;border-color:#ccc;-webkit-box-shadow:0 0 2px #aaa,0 0 2px #fff inset;-moz-box-shadow:0 0 2px #aaa,0 0 2px #fff inset;box-shadow:0 0 2px #aaa,0 0 2px #fff inset;text-shadow:0 0 1px #fff;}.layui-iconpicker-search{position:relative;margin:0 0 6px 0;border:1px solid #e6e6e6;border-radius:2px;transition:300ms;}.layui-iconpicker-search:hover{border-color:#D2D2D2!important;}.layui-iconpicker-search .layui-input{cursor:text;display:inline-block;width:86%;border:none;padding-right:0;margin-top:1px;}.layui-iconpicker-search .layui-icon{position:absolute;top:11px;right:4%;}.layui-iconpicker-tips{text-align:center;padding:8px 0;cursor:not-allowed;}.layui-iconpicker-page{margin-top:6px;margin-bottom:-6px;font-size:12px;padding:0 2px;}.layui-iconpicker-page-count{display:inline-block;}.layui-iconpicker-page-operate{display:inline-block;float:right;cursor:default;}.layui-iconpicker-page-operate .layui-icon{font-size:12px;cursor:pointer;}.layui-iconpicker-body-page .layui-iconpicker-icon-limit{display:none;}.layui-iconpicker-body-page .layui-iconpicker-icon-limit:first-child{display:block;}";
var H=f("head").find("style[iconpicker]");if(H.length===0){f("head").append('<style rel="stylesheet" iconpicker>'+I+"</style>")}},getData:function(H){var I=[];f.ajax({url:H,type:"get",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:false,success:function(K){var L=/fa-var-(.*):/ig;var J;while((J=L.exec(K))!=null){I.push("fa-"+J[1])}},error:function(L,J,K){layer.msg("fa图标接口有误")}});return I}};F.init();return new b()};b.prototype.checkIcon=function(l,o){var k=f("*[lay-filter="+l+"]"),m=k.next().find(".layui-iconpicker-item .fa"),n=o;if(n.indexOf("#xe")>0){m.html(n)}else{m.html("").attr("class","fa "+n)}k.attr("value",n).val(n)};var d=new b();e(i,d)});
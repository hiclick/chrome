//脚本所应用到的样式表
document.writeln("<style media=\"screen\" type=\"text\/css\">");
document.writeln(".sliderwrapper{overflow:hidden;}");
document.writeln(".sliderwrapper .contentdiv{height:100%;display:none;overflow:hidden;}");
document.writeln(".sliderfilter{filter:progid:DXImageTransform.Microsoft.alpha(opacity=100);-moz-opacity:1;opacity:1;}");
document.writeln("<\/style>");

//焦点图与舌签轮换 08.12.09
var featuredcontentslider={
ajaxloadingmsg: '<div>请稍候…</div>',
bustajaxcache: true,
enablepersist: false,
settingcaches: {},

buildcontentdivs:function(setting){
var alldivs=document.getElementById(setting.id).getElementsByTagName("div")
for (var i=0; i<alldivs.length; i++){
if (this.css(alldivs[i], "contentdiv", "check")){ //检查带有 class 名为 "contentdiv" 的 div 标签
setting.contentdivs.push(alldivs[i])
alldivs[i].style.display="none" // 执行时将所有div标签 display="none"
}
}
},

setopacity:function(setting, value){ //赋予targetobject变量中的模块透明度，取值0-1之间
var targetobject=setting.contentdivs[setting.currentpage-1]
targetobject.className = "contentdiv sliderfilter";
if (targetobject.filters && targetobject.filters[0]){ //IE syntax
if (typeof targetobject.filters[0].opacity=="number") //IE6
targetobject.filters[0].opacity=value*100
else //IE 5.5
targetobject.style.filter="alpha(opacity="+value*100+")"
}
else if (typeof targetobject.style.MozOpacity!="undefined") //Old Mozilla syntax
targetobject.style.MozOpacity=value
else if (typeof targetobject.style.opacity!="undefined") //Standard opacity syntax
targetobject.style.opacity=value
setting.curopacity=value
},

fadeup:function(setting){
if (setting.curopacity<=0.9){ //当curopacity值小于或等于0.9时
this.setopacity(setting, setting.curopacity+setting.enablefade[1])
window["fcsfade"+setting.id]=setTimeout(function(){featuredcontentslider.fadeup(setting)}, 25)
}
else{ //当渐变已经完成，即 当curopacity值大于0.9时
this.setopacity(setting, setting.curopacity-setting.enablefade[1])
var targetobject=setting.contentdivs[setting.currentpage-1]
targetobject.className = "contentdiv";
}
},

jumpTo:function(fcsid, pagenumber){ //public function to go to a slide manually.
this.turnpage(this.settingcaches[fcsid], pagenumber)
},

turnpage:function(setting, thepage, autocall){
var currentpage=setting.currentpage //定义当前
var totalpages=setting.contentdivs.length
var turntopage=(/prev/i.test(thepage))? currentpage-1 : (/next/i.test(thepage))? currentpage+1 : parseInt(thepage)
turntopage=(turntopage<1)? totalpages : (turntopage>totalpages)? 1 : turntopage //test for out of bound and adjust
if (turntopage==setting.currentpage && typeof autocall=="undefined") //if a pagination link is clicked on repeatedly
return
setting.currentpage=turntopage
setting.contentdivs[setting.prevpage-1].style.display="none" //collapse last content div shown (it was set to "block")
setting.contentdivs[turntopage-1].style.zIndex=++setting.topzindex
this.cleartimer(setting, window["fcsfade"+setting.id])
setting.cacheprevpage=setting.prevpage
if (setting.enablefade[0]==true){
setting.curopacity=0
this.fadeup(setting)
}
if (setting.enablefade[0]==false){ //if fade is disabled, fire onChange event immediately (verus after fade is complete)
setting.onChange(setting.prevpage, setting.currentpage)
}
setting.contentdivs[turntopage-1].style.visibility="visible"
setting.contentdivs[turntopage-1].style.display="block"
if (setting.prevpage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
this.css(setting.toclinks[setting.prevpage-1], "selected", "remove")
if (turntopage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
this.css(setting.toclinks[turntopage-1], "selected", "add")
setting.prevpage=turntopage
if (this.enablepersist)
this.setCookie("fcspersist"+setting.id, turntopage)
},

ajaxconnect:function(setting){
var page_request = false
if (window.ActiveXObject){ //IE中的 ActiveXObject 支持，对于IE7是无效的
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
}
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else if (window.XMLHttpRequest) // Mozilla, Safari 等浏览器
page_request = new XMLHttpRequest()
else
return false
var pageurl=setting.contentsource[1]
page_request.onreadystatechange=function(){
featuredcontentslider.ajaxpopulate(page_request, setting)
}
document.getElementById(setting.id).innerHTML=this.ajaxloadingmsg
var bustcache=(!this.bustajaxcache)? "" : (pageurl.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
page_request.open('GET', pageurl+bustcache, true)
page_request.send(null)
},

ajaxpopulate:function(page_request, setting){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)){
document.getElementById(setting.id).innerHTML=page_request.responseText
this.buildpaginate(setting)
}
},

buildpaginate:function(setting){
this.buildcontentdivs(setting)
var sliderdiv=document.getElementById(setting.id)
var pdiv=document.getElementById("paginate-"+setting.id)
var phtml=""
var toc=setting.toc
var nextprev=setting.nextprev
if (typeof toc=="string" && toc!="markup" || typeof toc=="object"){
for (var i=1; i<=setting.contentdivs.length; i++){
phtml+='<i class="iToc iToc'+i+'"><a href="#'+i+'" class="toc">'+(typeof toc=="string"? toc.replace(/#increment/, i) : toc[i-1])+'</a></i> '
}
phtml=(nextprev[0]!=''? '<i class="iToc iToc'+i+'"><a href="#prev" class="prev">'+nextprev[0]+'</a></i> ' : '') + phtml + (nextprev[1]!=''? '<i class="iToc iToc'+i+'"><a href="#next" class="next">'+nextprev[1]+'</a></i>' : '')
pdiv.innerHTML='<i class="subLineTab"></i><span class="subPageTab">'+phtml+'</span>'
}
var pdivlinks=pdiv.getElementsByTagName("a")
var toclinkscount=0 //var to keep track of actual # of toc links
for (var i=0; i<pdivlinks.length; i++){
if (this.css(pdivlinks[i], "toc", "check")){
if (toclinkscount>setting.contentdivs.length-1){ //if this toc link is out of range (user defined more toc links then there are contents)
pdivlinks[i].style.display="none" //hide this toc link
continue
}
pdivlinks[i].setAttribute("rel", ++toclinkscount) //store page number inside toc link
pdivlinks[i][setting.revealtype]=function(){
featuredcontentslider.turnpage(setting, this.getAttribute("rel"))
return false
}
setting.toclinks.push(pdivlinks[i])
}
else if (this.css(pdivlinks[i], "prev", "check") || this.css(pdivlinks[i], "next", "check")){ //check for links with class "prev" or "next"
pdivlinks[i].onclick=function(){
featuredcontentslider.turnpage(setting, this.className)
return false
}
}
}
this.turnpage(setting, setting.currentpage, true)
if (setting.autorotate[0]){ //当设置为自动轮换时，即 autorotate 为 true 时
pdiv[setting.revealtype]=function(){
return false
}
pdiv["onmouseover"]=function(){
featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])// onmouseover，停止自动轮换
return false
}
pdiv["onmouseout"]=function(){
featuredcontentslider.autorotate(setting)// onmouseout 后，继续自动轮换
return false
}
sliderdiv["onclick"]=function(){ //onclick 时，停止鼠标滑动感应，也就是此时 onmouseover 没有动作
featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])
}
setting.autorotate[1]=setting.autorotate[1]+(1/setting.enablefade[1]*50) //添加轮换停留时间
this.autorotate(setting)
}
},

urlparamselect:function(fcsid){
var result=window.location.search.match(new RegExp(fcsid+"=(\\d+)", "i")) //check for "?featuredcontentsliderid=2" in URL
return (result==null)? null : parseInt(RegExp.$1) //returns null or index, where index (int) is the selected tab's index
},

cleartimer:function(setting, timervar){
if (typeof timervar!="undefined"){
clearTimeout(timervar)
clearInterval(timervar)
if (setting.cacheprevpage!=setting.currentpage){ //if previous content isn't the same as the current shown div
setting.contentdivs[setting.cacheprevpage-1].style.display="none"
}
}
},

css:function(el, targetclass, action){
var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
if (action=="check")
return needle.test(el.className)
else if (action=="remove")
el.className=el.className.replace(needle, "")
else if (action=="add")
el.className+=" "+targetclass
},

autorotate:function(setting){
window["fcsautorun"+setting.id]=setInterval(function(){featuredcontentslider.turnpage(setting, "next")}, setting.autorotate[1])
},

getCookie:function(Name){
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return null
},

setCookie:function(name, value){
document.cookie = name+"="+value
},

iframeconnect:function(setting){ //增加iframe处理事件，支持iframe的轮换，但iframe与div的相互组合目前不能完成，即轮换内容既有iframe的内容又有div的内容的时候
var ifr = document.createElement('iframe');
ifr.id='iframeconnect'+new Date().getTime();
ifr.style.display='none';
var self = this;
var got = function(){
var d = ifr.contentDocument ? ifr.contentDocument : document.frames[ifr.id].document;
document.getElementById(setting.id).innerHTML=d.body.innerHTML;
document.body.removeChild(ifr);
self.buildpaginate(setting)
};
ifr.onload=got;
ifr.onreadystatechange=function(){
if(this.readyState=='complete') got();
}
ifr.src = setting.contentsource[1];
document.body.insertBefore(ifr,document.body.firstChild);
},

init:function(setting){
var persistedpage=this.getCookie("fcspersist"+setting.id) || 1
var urlselectedpage=this.urlparamselect(setting.id) //returns null or index from: mypage.htm?featuredcontentsliderid=index
this.settingcaches[setting.id]=setting //存储 "setting" 对象
setting.contentdivs=[]
setting.toclinks=[]
setting.topzindex=0
setting.currentpage=urlselectedpage || ((this.enablepersist)? persistedpage : 1)
setting.prevpage=setting.currentpage
setting.revealtype="on"+(setting.revealtype || "click")
setting.curopacity=0
setting.onChange=setting.onChange || function(){}
if (setting.contentsource[0]=="inline")//直接页面调用div
this.buildpaginate(setting)
if (setting.contentsource[0]=="ajax")//调用外部utf-8页面内容
this.ajaxconnect(setting)
if (setting.contentsource[0]=="iframe")//调用外部页面内容，主要以iframe形式获取，获取iframe内标签，主要解决非utf-8的内容
this.iframeconnect(setting)
}

}
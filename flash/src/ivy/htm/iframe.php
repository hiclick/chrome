<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>IFRAME</title>
<style type="text/css">
body { font-size:12px; line-height:24px; padding:0; margin:0;}
ul,li { margin: 0; padding: 0; list-style: none;}
li.hover { background-color: #efefef;}
.head { height:24px; border-bottom:#C9D7F1 solid 1px;}
.links { padding-left:10px;}
.item { border:#ccc solid 1px; margin: 10px 10px 0;}
.item .iHead { font-weight:bold; background:#EAEAEA url(http://www.google.com.hk/images/srpr/nav_logo14.png) left bottom; padding-left:10px; cursor:pointer;}
.item .iBody { padding:5px 10px;}
.item .iBody img { margin: 5px 0;}
.inpText { border:#fff solid 0px; width:400px; height:30px; line-height:30px; padding:0 5px; margin:0;}
.inpText2 { border:#fff solid 0px; width:30px; height:30px; line-height:30px; padding:0 5px; margin:0;}
.inpSubmit { background:#EAEAEA url(http://www.google.com.hk/images/srpr/nav_logo14.png) left bottom; cursor:pointer; height:30px; line-height:30px; font-size:14px; border:#fff solid 0px; padding:0 15px; margin:0;}
.inpBtn { background:#EAEAEA url(http://www.google.com.hk/images/srpr/nav_logo14.png) -153px -70px; cursor:pointer; height:13px; font-size:14px; border:#fff solid 0px; width:13px; margin:0;}
.inpBorder { border:#ccc solid 1px; border-bottom-color:#999; border-right-color:#999; display:block;}
.inpSpan { border-bottom:#E7E7E7 solid 1px; border-right:#E7E7E7 solid 1px; display:inline; float:left;}
.urlAdd { float: left; margin: 2px 0 0 10px;}
.urlWrap { float: left; width:410px; margin-left: 10px; text-align: left;}
.paramWrap { float: left; margin-left: 10px; text-align: left;}
.mount { float: left; margin-left: 10px; line-height: 30px;}
.rel { position: relative;}
.ivysWrap { position: absolute; left: 0; top: 0;}
.ivys { width: 400px; height: 400px; border:#fff solid 0px; padding: 0 5px; margin: 0;}
.ivysFocus { height: 30px;}
.warning { border:#c00 solid 2px; background-color:#c00; color:#fff; font-weight:normal;}
.note { border:#1AB058 solid 2px; background-color:#1AB058; color:#fff; font-weight:normal;}
.mark { width:0; height:0; overflow:hidden; border:#5C97E6 solid 5px; border-right:#c00 solid 5px; display:inline-block; position:absolute; left:-10px; top:2px;}
.fred { color: #c00;}
.fgreen { color: #1AB058;}
.fgray { color: #666;}
.m10 { margin:10px 0 0;}
.ml10 { margin-left:10px;}
.clear { clear:both;}
.hidden { display:none;}
.errPic {height:778px;}
.errPic img { width: 1024px; height: 768px;}
</style>
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc" vlink="#551a8b" alink="#ff0000">
<div class="inputForm m10">
    <form method="get">
        <span class="urlWrap">
        <span class="inpSpan urlBox"><span class="inpBorder"><input type="text" name="url" class="inpText" value="<?=$_GET["url"]?>" /></span></span>
        </span>
        <span class="paramWrap">
        <span class="inpSpan"><span class="inpBorder"><input type="text" name="width" class="inpText2" value="<? if(!$_GET["width"]){echo "800";}else{echo $_GET["width"];} ?>" /></span></span>
        <span class="inpSpan"><span class="inpBorder"><input type="text" name="height" class="inpText2" value="<? if(!$_GET["height"]){echo "200"}else{echo $_GET["height"];} ?>" /></span></span>
        <span class="inpSpan"><label><input type="checkbox" name="test15" value="1" <? if($_GET["height"]=="1"){echo "checked"} ?> /> test15</label></span>
        </span>
        <span class="inpSpan ml10"><span class="inpBorder"><input type="submit" value="提交" class="inpSubmit" /></span></span>
        <div class="clear"></div>
    </form>
</div>
<? if(isset($_GET["url"])){ ?>
<div class="item">
    <div class="iBody" ${empty param.test15 ? '' : 'style="width:1px;height:0px;overflow:hidden;position:absolute;display:block;"'}>
        <iframe <? if($_GET["test15"]=="1"){echo "name=\"test15ShowIfr\" style=\"margin-top:-8888px;\""} ?> src="<?=$_GET["url"]?>" scrolling="yes" frameborder="1" width="<? if(!$_GET["width"]){echo "800";}else{echo $_GET["width"];} ?>" height="<? if(!$_GET["height"]){echo "200"}else{echo $_GET["height"];} ?>"></iframe>
    </div>
</div>
<? } ?>
</body>
</html>
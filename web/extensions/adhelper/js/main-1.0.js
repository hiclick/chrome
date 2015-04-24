﻿/**
 *
 * 组织界面
 */

var startBtn = '<input name="helper" type="button" value="广告助手" id="helper">';
var hidetr = "<div id=\"dialog\" title=\"广告助手\">\n" +
    "<span>美化界面：<input type=\"button\" id=\"mofifyth\" value=\"修正表头 →\"/></span>\n" +
    "<br/><br/>\n" +
    "<span>隐藏内容：\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"位置标识\" />位置标识</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"监\" />监测</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"备注\" />备注</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"外购点击\" />外购点击</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"完成率\" />完成率</label>\n" +
    " <input type=\"button\" id=\"chkall\" value=\"全选\">\n" +
    "</span>\n" +
    "<br/><br/>\n" +
    "<label>手工隐藏：\n" +
    "    <select id=\"target_tr\">\n" +
    "        <option value=\"点击目标\">点击目标</option>\n" +
    "        <option value=\"公司名称\">公司名称</option>\n" +
    "        <option value=\"实时点击\">实时点击</option>\n" +
    "        <option value=\"VM点击\">VM点击</option>\n" +
    "        <option value=\"真实PV\">真实PV</option>\n" +
    "        <option value=\"真实点击\">真实点击</option>\n" +
    "        <option value=\"更新时间\">更新时间</option>\n" +
    "        <option value=\"更新类型\">更新类型</option>\n" +
    "    </select>\n" +
    "</label>\n" +
    "</div>";

$(startBtn).appendTo('.info_row2:last');
$(hidetr).appendTo("td.info_row2:last");

/**
 *
 * 外挂JS
 */

// http://imgad0.pchouse.com.cn/ivy/image/ads/chrome/ext.js

/*
 (function(doc){
 var t = parseInt((new Date()).getTime() / 1000);
 var v = t - t % 300;
 var js = doc.createElement("script");
 js.charset = "utf-8";
 js.src = "http://imgad0.pchouse.com.cn/ivy/image/ads/chrome/ext.js?ts=" + v;
 var fs = doc.getElementsByTagName('script')[0];
 fs.parentNode.insertBefore(js, fs);
 })(document);
 */


$(document).ready(function () {

    $("#dialog").dialog({
        autoOpen: false,
        width: 500,
        height: 200,
        buttons: [
            {
                text: "Ok",
                click: function () {
                    hideTitle();
                    modifyTitle();
                    $(this).dialog("close");
                }
            },
            {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#helper").click(function (event) {
        $("#dialog").dialog("open");
        event.preventDefault();

    });

    $("#mofifyth").click(function () {
        modifyTitle();
    });

    $("#chkall").click(function () {
        $('input:checkbox').each(function() {
            $(this).attr('checked', true);
        });
    });

});

function hideTitle() {
    var titles = [];
    $(":checkbox:checked").each(
        function () {
            titles.push($(this).val())
        });

//    var htitle = $("#htitle").val().trim();
//    if(htitle.length>0){
//        titles.push(htitle);
//    }

    var target_tr = $("#target_tr").val();
    titles.push(target_tr);

    $.each(titles, function(key, val) {
        _hide(val);
        //console.log('index in arr:' + key + ", corresponding value:" + val);
    });
}

function modifyTitle() {
    var th = $("th:contains('外购目标')");
    //eq(0)获取到的为一个jquery对象
    //get(0)获取到的为一个html对象，无法使用jquery中的attr, html()等方法
    th.html("外购目标");
}


/**
 *
 * 工具函数
 */

function _hide(title) {
    var
        tbl = $("table.stripe_tb:eq(0)"),
        th = tbl.find("th:contains(" + title + ")"),
        index = th.index();

    th.hide();

    tbl.find("tbody tr").each(function () {
        $(this).find("td").eq(index).hide();
    });
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
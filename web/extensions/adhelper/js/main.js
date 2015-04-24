/**
 *
 * 组织界面
 */

var startBtn = "<input name=\"helper\" type=\"button\" value=\"广告助手\" id=\"helper\">";

var hidetr = "<div id=\"dialog\" title=\"广告助手\">\n" +
    "<span>美化界面：<input type=\"button\" id=\"mofifyth\" value=\"修正表头\"/>\n" +
    "    <input type=\"button\" id=\"mofifymem\" value=\"更正备注\"/>\n" +
    "    <input type=\"button\" id=\"removeProvider\" value=\"隐藏渠道\"/>\n" +
    "</span>\n" +
    "<br/><br/>\n" +
    "<span>常用隐藏：\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"位置标识\" />位置标识</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"监\" />监测</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"备注\" />备注</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"外购点击\" />外购点击</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"外购实时\" />外购实时</label>\n" +
    "<label><input type=\"checkbox\" name=\"target_tr\" value=\"完成率\" />完成率</label>\n" +
    "<input type=\"button\" id=\"chkall\" value=\"全选\">\n" +
    "</span>\n" +
    "\n" +
    "<br/><br/>\n" +
    "\n" +
    "<label>其它隐藏：\n" +
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

$.noConflict();

jQuery(startBtn).appendTo('.info_row2:last');
jQuery(hidetr).appendTo("td.info_row2:last");

jQuery(document).ready(function ($) {

    var dhight = 272;
    if(Browser.platform == "mac"){
        dhight = 232;
    }

    $("#dialog").dialog({
        autoOpen: false,
        width: 535,
        height: dhight, // win 272 mac 232
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

    $("#mofifymem").click(function () {
        modifyMemo();
    });

    $("#removeProvider").click(function () {
        removeProvider();
    });

    $("#chkall").click(function () {
        $('input:checkbox').each(function() {
            $(this).attr('checked', true);
        });
    });

});


function hideTitle() {
    var titles = [];
    jQuery(":checkbox:checked").each(
        function () {
            titles.push(jQuery(this).val())
        });

    var target_tr = jQuery("#target_tr").val();
    titles.push(target_tr);

    jQuery.each(titles, function(key, val) {
        _hide(val);
    });
}

function modifyTitle() {
    var th1 = jQuery("th:contains('点击外购目标')");
    //eq(0)获取到的为一个jquery对象
    //get(0)获取到的为一个html对象，无法使用jquery中的attr, html()等方法
    th1.html("外购目标");
    var th2 = jQuery("th:contains('外购实时点击')");
    th2.html("外购实时");


}

function modifyMemo() {
    var th = jQuery("table.stripe_tb:eq(0)").find("th:contains('备注')");
   th.text("实时数据");
}

function removeProvider(){
    var reg = /赛舤|蜗牛|好赚|点钻|黑马|软告|赛帆|电钻/ig;
    jQuery(":input").each(function(){
        var memo = jQuery(this);
        if(memo.val().search(reg)>0){
            var newVal = memo.val().replace(reg,"");
            memo.val(newVal);
        }
    });
}


/**
 *
 * 工具函数
*/

function _hide(title) {
    var
        tbl = jQuery("table.stripe_tb:eq(0)"),
        //tbl = jQuery("table.stripe_tb"),
        th = tbl.find("th:contains(" + title + ")"),
        index = th.index();

    th.hide();

    tbl.find("tbody tr").each(function () {
        jQuery(this).find("td").eq(index).hide();
    });
}
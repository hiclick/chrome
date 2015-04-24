package com.chenzixin.test;

/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 14-8-15
 * Time: 上午9:54
 */
public class Main {

    String title = "<input name=\"helper\" type=\"button\" value=\"广告助手\" id=\"helper\">";

    String text = "<div id=\"dialog\" title=\"广告助手\">\n" +
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

    public static void main(String[] args) {
        Main m = new Main();
        System.out.println(m.text);
    }
}

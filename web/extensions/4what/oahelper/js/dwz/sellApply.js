var SellApply = {
    replaceHtml : function(text) {
        if (text && typeof text === "string") {
            return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n|\n|\r/g, "<br>").replace(/\s/g, "&nbsp;");
        }
        return text || "";
    } ,
    wrapDiv:function (html) {
        return "<div>" + html + "</div>";
    },
    reSpecialCharForJson : function(str) {
        var specialChar = {"\\\\":"\\\\", "\"": "\\\"", "\n":"\\n",
            "\r\n":"\\r\\n", "\b":"\\b", "\r":"\\r", "\t" : " "};
        for (var i in specialChar) {
            str = str.replace(new RegExp(i, "g"), specialChar[i]);
        }
        return str;
    },
    getJsonString : function(str) {    //把 a=1&b=2&c=3&d=4&e=6 格式的url字符串，转换成 json字符串
        var result = "{";
        var param = str.split("&");
        for (var i in param) {
            var params = param[i].split("=");
            result += ("\"" + params[0] + "\":\"");
            var value = decodeURIComponent(params[1]);  //因为 str 是通过  jquery 的 serialize() 获取的，所以这里，解码
            result += (this.reSpecialCharForJson(value) + "\"");
            if (i < param.length - 1) {
                result += ",";
            }
        }
        result += "}";
        return result;
    },
    toString : function(obj, forSubmit) {       //把json转成字符串
        if (typeof forSubmit === "undefined") var forSubmit = false;
        var THIS = SellApply;
        switch (typeof(obj)) {
            case 'string':
                if (!forSubmit) return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
                return '"' + THIS.reSpecialCharForJson(obj) + '"';      //提交表单时，因为需要把json转成字符串后放入到input里，提交给后台 ，所以需要再进行一次 对 \ " \r \n 的转换

            case 'array':
                return '[' + obj.map(THIS.toString).join(',') + ']';
            case 'object':
                if (obj instanceof Array) {
                    var strArr = [];
                    var len = obj.length;
                    for (var i = 0; i < len; i++) {
                        strArr.push(THIS.toString(obj[i], forSubmit));
                    }
                    return '[' + strArr.join(',') + ']';
                } else if (obj == null) {
                    return 'null';

                } else {
                    var string = [];
                    for (var property in obj) string.push(THIS.toString(property) + ':' + THIS.toString(obj[property], forSubmit));
                    return '{' + string.join(',') + '}';
                }
            case 'number':
                return obj;
            case false:
                return obj;
        }
    },
    textAreaLength : function() {       //页面加载完成，给textarea加了 keypress keydown keyup，控制输入长度
        $("textarea[maxlength]", $.pdialog.getCurrent()).each(function() {
            $(this).keypress(function() {
                reSetValue(this);
            });
            $(this).keydown(function() {
                reSetValue(this);
            });
            $(this).keyup(function() {
                reSetValue(this);
            });
        });
        function reSetValue(obj) {
            var maxLength = $(obj).attr("maxLength") || 0;
            var value = $(obj).val() || "";
            if (maxLength) {
                if (value.length > maxLength) {
                    $(obj).val(value.substring(0, maxLength));
                }
            }
        }

    }

};

/*---添加申请页面里的，选择itemform相关------*/
/*
*   1.给 tbody 添加 一个 tbody的 class
* */
/*---------添加itemForm----------*/

SellApply.itemForm = {
    $form : [],
    cache : true,
    itemFormStore : [],
    init : function() {
        this.$form =$(".SellApplyForm", navTab.getCurrentPanel());
        this.$form.find("tbody.tbody").find("tr").unbind("click").unbind("hover").click(this._trClick).hoverClass("hover");
    },
    buildItemFormStore : function(trId, formId) {     //itemForm.jsp把填写 好的值添加到 form.jsp 的 itemFormStore  //trId有值编辑用，没值新增
        var _this = this;
        var $form = jQuery("#" + formId, $.pdialog.getCurrent());
        var $submitBtn = $form.find(".itemFormSubmit:first").attr("disabled","disabled");
        $form.find("input[name][type='text'], textarea[name]").each(function() {
            var value = $.trim($(this).val());
            $(this).val(value);
        });
        if (!$form.valid()) {
            $submitBtn.removeAttr("disabled","disabled");
            return false;
        }
        var formValue = $form.serialize() || "";
        formValue = SellApply.getJsonString(formValue.replace(/\+/g, ' '));;
        if (formValue && $.trim(formValue)) {
            _this.addItemFormStore(formValue, trId);
            $.pdialog.closeCurrent();
        }
    },
    _getTrIndex : function($tbody){  //屏蔽隐藏tr，从index从1开始，
        if($tbody) return parseInt($tbody.find("tr:last").attr("rel") )+ 1
        return parseInt(this.$form.find("tbody.tbody").find("tr:last").attr("rel")) + 1;       //----$form
    },
    addItemFormStore : function(obj, trId) {
        var _this = this;
        var $trData = DWZ.jsonEval(obj);                                 //一条行数据
        var $tr = _this._objToTr($trData, trId);
        $tr.attr("data", obj);
    },
    _objToTr : function (json, trId) {
        var _this = this;
        var $tbody = this._getForm().find("tbody.tbody");
        var $tr;
        if (trId) {      //trId有值=修改
            $tr = $tbody.find("tr[rel='" + trId + "']");
        } else {  //没值=新增
            var $trFirst = $tbody.find("tr:first-child");
            //$tr =  $trFirst.clone(true).unbind("click").click(_this._trClick);
            $tr = $("<tr/>").html($trFirst.html()).click(_this._trClick).hoverClass("hover");
            $tr.attr("target", $trFirst.attr("target")).attr("rel", _this._getTrIndex($tbody));
            $tbody.append($tr);
        }
        for (var name in json) {
            $tr.find("td[name='" + name + "']").html(SellApply.wrapDiv(SellApply.replaceHtml(json[name])));
        }
        if($tr.prev().hasClass("trbg")) $tr.removeClass("trbg");
        else $tr.addClass("trbg");
        return $tr.removeClass("selected").show();
    },
    _trClick : function(){                                                   //----$form
        var _this = SellApply.itemForm;
        var $tr = $(this);
        $tr.siblings(".selected").removeClass("selected");
        $tr.addClass("selected");
        var sTarget = $tr.attr("target");
        if (sTarget) {
            var $grid = $tr.parents("div.grid:first");
            if($grid.length == 0) $grid = $tr.parents("table.list:first").parent();
            if($("#" + sTarget, $grid).size() == 0){
                $grid.prepend('<input id="' + sTarget + '" type="hidden" />');
            }
            $("#" + sTarget, _this._getForm()).val($tr.attr("rel"));
        }
    },
    /*------------------    编辑    ------------------------------------*/
    setItemFormValue : function(trId, formId) {      //编辑 itemform 子项时用： 把 数据层的行数据（对应tr）设置给（还原到）表现层 itemForm.jsp 的各个值域 进行展现
        var _this = this;
        if (trId) {        //trId从 1开始， 对应 itemFormStore 的index 是从零 开始，所以减 1
            var $trSelect = _this._getForm().find("tbody.tbody > tr.selected");
            if($trSelect.length <= 0)  return;
            var itemValue = DWZ.jsonEval($trSelect.attr("data"));
            var $form = jQuery("#" + formId, $.pdialog.getCurrent());
            for (var name in itemValue) {
                $form.find("input[name='" + name + "'],textarea[name='" + name + "'],select[name='" + name + "']").val(itemValue[name]);
            }
        }
    },
    deleteItemValue : function(relId) {  //单条删除
        var _this = this;
        var $rel = $("#" + relId, navTab.getCurrentPanel());
        var value = $rel.val();
        if (value) {
           var $tbody = _this._getForm().find("tbody.tbody");
            alertMsg.confirm("您确定删除该条记录吗？", {
					okCall: function(){
						  //删除表现层Table-tr
                        $tbody.find("tr[rel='" + value + "']").remove();
                        $rel.val("");
						alertMsg.correct("删除成功！");
					}
				});
        } else {
            alertMsg.error(DWZ.msg("alertSelectMsg"));
        }
    },
    /*---  显示 ----*/
      showItem : function(dom, url) {//详情
        var $dom = $(dom);
        var width = window.screen.availWidth * 9 / 10;
        var height = window.screen.availHeight * 1.3 / 2;
        var options = {width:width,height:height,mask:true,mixable:true,minable:true,resizable:true,drawable:true,fresh:true};

        url = url.replace(/%7B[\w]+%7D|\{[\w]+\}/);
        $.pdialog.open(url, "", $dom.attr("title"), options);
      },
    /*-----------提交表单里 调用-------------*/
    setItemForm : function() {
        var _this = this;
        _this._getForm().find("input[name='itemForm']").val(SellApply.toString(_this.getItemFormStore(), true));
    },
    /*获取 所有 tr中的 data ---- 查看详情时 and 提交表单 调用 */
    getItemFormStore : function(){
        var _this = this;
        var $form = _this._getForm();
        _this.itemFormStore = [];
        $form.find("tbody.tbody > tr:not(:hidden)").each(function(){
            _this.itemFormStore[_this.itemFormStore.length] = DWZ.jsonEval($(this).attr("data"));
        });
        return  _this.itemFormStore;
    },
    _getForm : function() {
        return $(".SellApplyForm", navTab.getCurrentPanel());
   }


}

/*------itemform相关-end-----*/

/*--------------------------详情页面----------------------------------------*/
/*SellApply.updateContractNo 修改合同号，详情页面 */
 SellApply.updateContractNo = function(obj, approvalType, id, redirectUrl, taskId){
     if ($(obj).attr("readonly") || !$(obj).val())   return;
     var _this = this;
     var value = $(obj).val().replace(/\s+/g, "");
     $(obj).val(value);
     alertMsg.confirm("请核对您所填的合同号：" + value, {
         okCall : function() {
             var url = ROOT + "/sell/updateContractNo" + URL_SUFFIX;            //见index.jsp
             $.ajax({
                 type: 'POST',
                 url:url,
                 data:{approvalType : approvalType, id : id, contractNo : value},
                 dataType:"json",
                 cache: false,
                 success: function(data) {
                     if (data.statusCode == DWZ.statusCode.ok) {

                         var url = redirectUrl += ("?id=" + id);
                         if (taskId && $.trim(taskId)) {
                             url += "&taskId=" + taskId
                         }
                         navTab.reload(url);
                     } else {
                         alertMsg.error(data.message);
                     }
                 }
             });
         }
     });
}


needJS(window.$,"http://www1.pconline.com.cn/js/pc.jquery1.3.js",function(){

    /*
    https://github.com/marcuswestin/store.js
    http://dev.w3.org/html5/webstorage/#storage-0
    */

    var storage = window.localStorage;

    $("#idCard").val(storage.getItem("idCard"));
    $("#email").val(storage.getItem("email"));

    $(':button.bnt').click(function(){
        var idCard = $("#idCard").val();
        var email  = $("#email").val();

        //if(isCardNo(idCard)&&isEmail(email)) {
            storage.setItem("idCard",idCard);
            storage.setItem("email",email);
        //}
    });

    $('<input name="gcode" type="button" value="插件启动">').click(function(){
		alert("科技改变生活...");
	}).appendTo('.user');
});


function isCardNo(card){
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        return  false;
    }
}

function isEmail(mail){
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(mail);
}


function needJS(E,C,B){B=B||function(){};if(E)return B(false);var $=window.__needJS__||(window.__needJS__=[]),D=$[C]||($[C]={loaded:false,callbacks:[]});if(D.loaded)return B(false);var _=D.callbacks;if(_.push(B)==1){var A=document.createElement("script");A.onload=A.onreadystatechange=function(){var $=A.readyState;if($&&$!="loaded"&&$!="complete")return;D.loaded=true;for(var B=0;B<_.length;B++)_[B](true)};A.src=C;document.getElementsByTagName("head")[0].appendChild(A)}}

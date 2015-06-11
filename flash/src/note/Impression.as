/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 13-4-15
 * Time: PM3:40
 */
package note  {

import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.net.URLLoader;
import flash.net.URLRequest;
import flash.net.navigateToURL;
import flash.text.TextField;
import flash.ui.Mouse;
import flash.ui.MouseCursor;

import mx.core.FlexTextField;

import com.adobe.utils.DateUtil;
import com.adobe.utils.StringUtil;

[SWF(backgroundColor="0xF5F5F5", width="1032", height="415")]
public class Impression extends MovieClip {


    // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/mx/controls/Button.html

    [Embed(source="../../assets/img/skydrive.png")]
    private var BackGround:Class;

    private var info:TextField = new FlexTextField();



    public function Impression() {

        Mouse.cursor = MouseCursor.BUTTON;

        var bg:* = new BackGround();
        addChild(bg);

        var tag:String = "http://v.admaster.com.cn/i/a12323,b200147754,c1350,i0,m201,h?ts=" + new Date().getTime();
        var isControl:Boolean = true;//是否第一次请求，如果是，执行，否则不执行！

        info.x = 20;
        info.y = 350;
        info.textColor = 0xffffff;
        addChild(info);

        try {
            if (isControl) {
                new URLLoader().load(new URLRequest(tag));
                isControl = false;
            }
        }
        catch (error:Error) {
            trace("unable to loader" + error);
        }


        stage.addEventListener(MouseEvent.CLICK, clickHandler);

        function clickHandler(evt:MouseEvent):void {
            var click_URL:String = "http://www.baidu.com/" ;
            navigateToURL(new URLRequest(click_URL));
        }

        renderTrace();
    }

    private function renderTrace():void{
        //info.text = "陈自新制作";
        info.text = "20" + DateUtil.getShortYear(new Date()) + StringUtil.remove(" Chrisddten","dd");
        info.multiline = false;
    }
}
}

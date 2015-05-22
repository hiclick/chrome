/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-5-22
 * Time: 上午11:06
 */
package ivy.swf {

import flash.display.Sprite;
import flash.net.URLLoader;
import flash.net.URLRequest;

//import flash.external.ExternalInterface;

[SWF(backgroundColor="0xF5F5F5", width="860", height="75")]
public class Benbenq extends Sprite {

    [Embed(source="../../../assets/img/Auto.png")]
    private var Auto:Class;


    public function Benbenq() {
        var bg:* = new Auto();
        addChild(bg);

        traceIvy();
    }


    private static function traceIvy():void {
        var adid:Number = 10012;
        var imp_URL:String = "http://ivy.pcauto.com.cn/adpuba/click?adid=" + adid + "&id=auto.test.click.&"/* + "timestamp=" + new Date().getTime()*/;
        var firstFlag;//是否第一次请求，如果是，执行，否则不执行！

        try {
            if (firstFlag == undefined) {
                var loader:URLLoader = new URLLoader();
                loader.load(new URLRequest(imp_URL));
                //trace(imp_URL)
                firstFlag = 1;
                trace("Success...");

                /*if (ExternalInterface.available) {
                 ExternalInterface.call("sendToJavaScript", "hello");
                 }
                 */
            }
        } catch (error:Error) {
            trace("Unable to loader: " + error);
        }
    }
}
}

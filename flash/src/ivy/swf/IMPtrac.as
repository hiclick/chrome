/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-5-25
 * Time: 下午2:11
 */
package ivy.swf {
import flash.display.GradientType;
import flash.display.MovieClip;
import flash.events.Event;
import flash.events.TimerEvent;
import flash.geom.Matrix;
import flash.net.URLLoader;
import flash.net.URLRequest;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;
import flash.ui.Mouse;
import flash.ui.MouseCursor;
import flash.utils.Timer;

import gs.TweenMax;
import gs.easing.*;


[SWF(backgroundColor="0xF5F5F5", width="800", height="100")]
public class IMPtrac extends MovieClip {

    private var matrixMovieClip:MovieClip = new MovieClip();

    [Embed(source="../../../assets/img/A3Limousine.png")]
    private var Auto:Class;


    public var adid:Number = 10012;

    public function IMPtrac() {

        Mouse.cursor = MouseCursor.BUTTON;

        drawBack(0, 0, 800, 100);
        addChild(matrixMovieClip);

        addLogo();
        addAuto();
        traceClick();

        var myTimer:Timer = new Timer(1500);
        myTimer.addEventListener(TimerEvent.TIMER, addMoveBox);
        myTimer.start();

    }

    private function addMoveBox(evt:Event):void {
        var moveMovieClip:MovieClip = new MovieClip();
        moveMovieClip.graphics.beginFill(0xcacbcd);
        moveMovieClip.graphics.drawRect(0, 0, 10, 100);
        moveMovieClip.graphics.endFill();
        moveMovieClip.x = 0;
        moveMovieClip.y = 0;
        addChild(moveMovieClip);
        TweenMax.to(moveMovieClip, 3, {
            x: 600,
            y: 0,
            alpha: 0,
            ease: Bounce.easeOut
        });
    }

    private function addLogo():void {
        var logo:TextField = new TextField();
        logo.text = "一汽 - 大众 Audi";
        logo.textColor = 0xFFFFFF;
        var mytf:TextFormat = new TextFormat();
        mytf.size = 20;
        mytf.font = "Arial";
        logo.autoSize = TextFieldAutoSize.CENTER;
        logo.setTextFormat(mytf);
        addChild(logo);
        logo.x = 5;
        logo.y = 20;
        TweenMax.to(logo, 1, {x: 20, y: 15, ease:Bounce.easeIn});
    }

    private function addAuto():void {
        var auto:* = new Auto();
        addChild(auto);
        auto.x = 400;
        auto.y = 0;
        TweenMax.to(auto, 1, {x: 640, y: 20, scaleX: 0.6, scaleY: 0.6, onComplete: showAD});
    }

    private function showAD():void {
        var No:Number = adid - 10000;
        var ad:TextField = new TextField();
        ad.text = "未来 · 先见 全新 Audi S" + No;
        ad.textColor = 0xFFFFFF;
        var mytf:TextFormat = new TextFormat();
        mytf.size = 20;
        mytf.font = "黑体";
        ad.autoSize = TextFieldAutoSize.LEFT;
        ad.setTextFormat(mytf);
        addChild(ad);
        ad.x = (stage.width - ad.width) / 2;
        ad.y = 0;
        TweenMax.to(ad, 1, {
            x: (stage.width - ad.width) / 2,
            y: (stage.height - ad.height) / 2,
            scaleX: 1.2,
            scaleY: 1.2
        });
    }

    public function drawBack(x0:Number, y0:Number, w1:Number, h1:Number):void {
        var matrixType:String = GradientType.LINEAR;
        var color:Array = [0xe10011, 0x910000];
        var Alpha:Array = [100, 100];
        var ratios:Array = [0, 255];
        var matrix:Matrix = new Matrix();
        //w1 -= 10;
        var boxWidth:Number = w1;
        var boxHeight:Number = h1;
        var boxRotation:Number = -Math.PI / 2;
        var tx:Number = 25;
        var ty:Number = 0;
        matrix.createGradientBox(boxWidth, boxHeight, boxRotation, tx, ty);
        matrixMovieClip.graphics.beginGradientFill(matrixType, color, Alpha, ratios, matrix);
        matrixMovieClip.graphics.drawRect(x0, y0, w1, h1);
    }

    private function traceClick():void {
        var imp_URL:String = "http://ivy.pcauto.com.cn/adpuba/click?adid=" + adid + "&id=auto.test.click.&"/* + "timestamp=" + new Date().getTime()*/;
        var firstFlag;//是否第一次请求，如果是，执行，否则不执行！

        try {
            if (firstFlag == undefined) {
                var loader:URLLoader = new URLLoader();
                loader.load(new URLRequest(imp_URL));
                //trace(imp_URL)
                firstFlag = 1;
                //trace("Success...");
            }
        } catch (error:Error) {
            //trace("Unable to loader: " + error);
        }
    }
}
}

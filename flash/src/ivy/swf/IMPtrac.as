/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-5-25
 * Time: 下午2:11
 */
package ivy.swf {
import flash.display.GradientType;
import flash.display.MovieClip;
import flash.geom.Matrix;
import flash.net.URLLoader;
import flash.net.URLRequest;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;
import flash.ui.Mouse;
import flash.ui.MouseCursor;

import gs.TweenMax;
import gs.easing.*;


[SWF(backgroundColor="0xF5F5F5", width="800", height="100")]
public class IMPtrac extends MovieClip {

    private var basicMovieClip:MovieClip = new MovieClip();
    private var matrixMovieClip:MovieClip = new MovieClip();
    private var moveMovieClip:MovieClip = new MovieClip();

    [Embed(source="../../../assets/img/AudiLogo.png")]
    private var Logo:Class;
    [Embed(source="../../../assets/img/A3Limousine.png")]
    private var Auto:Class;

    private var ad:TextField;

    public function IMPtrac() {

        Mouse.cursor = MouseCursor.BUTTON;

        // Basic Example
        basicMovieClip.graphics.beginFill(0xFFFFFF);
        basicMovieClip.graphics.drawRect(0, 0, 800, 100);
        basicMovieClip.graphics.endFill();
        basicMovieClip.x = 0;
        basicMovieClip.y = 0;
        addChild(basicMovieClip);

        drawBack(0, 10, 800, 80);
        addChild(matrixMovieClip);

        moveMovieClip.graphics.beginFill(0xcacbcd);
        moveMovieClip.graphics.drawRect(0, 0, 10, 80);
        moveMovieClip.graphics.endFill();
        moveMovieClip.x = 0;
        moveMovieClip.y = 10;
        addChild(moveMovieClip);

        //TweenMax.to(moveMovieClip, 1, {x:700, y:10, alpha:0});
        TweenMax.to(moveMovieClip, 3, {x: 600, y: 10, alpha: 0, ease: Bounce.easeOut});


        var logo:* = new Logo();
        addChild(logo);
        logo.x = 0;
        logo.y = 0;
        TweenMax.to(logo, 2, {x: 20, y: 30, scaleX: 0.5, scaleY: 0.5});

        var auto:* = new Auto();
        addChild(auto);
        auto.x = 400;
        auto.y = 0;
        TweenMax.to(auto, 1, {x: 640, y: 30, scaleX: 0.38, scaleY: 0.38});

        ad = new TextField();
        ad.text = "突破科技 启迪未来";
        ad.textColor = 0xFFFFFF;
        var mytf:TextFormat = new TextFormat();
        mytf.size = 20;
        mytf.font = "黑体";
        ad.autoSize = TextFieldAutoSize.LEFT;
        ad.setTextFormat(mytf);
        addChild(ad);
        ad.x = 300;
        ad.y = 40;

        traceIvy();

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

    private static function traceIvy():void {
        var adid:Number = 10009;
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

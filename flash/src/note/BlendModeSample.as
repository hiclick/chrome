/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-5-28
 * Time: 下午12:35
 */
package note {
import flash.display.BitmapData;
import flash.display.BlendMode;
import flash.display.Graphics;
import flash.display.MovieClip;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;
import flash.geom.ColorTransform;
import flash.geom.Matrix;

public class BlendModeSample extends MovieClip {
    public function BlendModeSample() {
        init();
    }

    private function init():void {
        //原始数据
        var bmpd:BitmapData = new BitmapData(550, 400, true, 0xff000000);
        var shape:Shape = new Shape();
        shape.graphics.beginBitmapFill(bmpd);
        shape.graphics.drawRect(0, 0, 550, 400);
        shape.graphics.endFill();
        addChild(shape);
        //橡皮擦
        var mc:Sprite = new Sprite();
        addChild(mc);
        mc.visible = false;
        //半径
        var r:int = 0;
        //动作
        shape.addEventListener(Event.ENTER_FRAME, enterHandler);
        function enterHandler(e:Event):void {
            var g:Graphics = mc.graphics;
            g.clear();
            for (var i:int = 0; i < 20; i++) {
                g.beginFill(0x999999, 1);
                g.drawCircle(65 + (i % 5) * 100, 50 + int(i / 5) * 95, r);
            }
            g.endFill();
            r += 1;
            bmpd.draw(mc, new Matrix(), new ColorTransform(), BlendMode.ERASE);
        }
    }
}
}

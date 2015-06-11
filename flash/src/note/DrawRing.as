/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-4-24
 * Time: 上午10:35
 */
package note {
import flash.display.MovieClip;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;

[SWF(backgroundColor="0xffffff", width="550", height="400")]
public class DrawRing extends MovieClip {

    public function DrawRing() {
        init7();
    }

    private function init0():void {
        //设置填充颜色和边框颜色
        var colorFill:uint = 0x00ff00;
        var colorLine:uint = 0xff0000;
        //设置绘图效果并画图
        graphics.beginFill(colorFill);
        graphics.lineStyle(2, colorLine);
        graphics.drawCircle(200, 200, 50);
        graphics.endFill();

    }

    private function init1():void {
        var shape:Shape = new Shape();
        shape.graphics.beginFill(0xff0000, 1);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.graphics.drawCircle(50, 50, 40);
        shape.graphics.endFill();
        addChild(shape);
    }

    private function init2():void {
        var mc:MovieClip;
        fillCircle(mc, 200, 200, 30, 50, 10, 0x000000, 0xaaf000);
    }

    //fillCircle(影片剪辑mc，X坐标px，Y坐标py，内半径r1，外半径r2，线厚度thickness，线颜色color1，填充颜色color2）：
    private function fillCircle(mc:MovieClip, px:Number, py:Number, r1:Number, r2:Number, thickness:Number, color1:Number, color2:Number):void {
        mc = new MovieClip();
        this.addChild(mc);
        mc.graphics.lineStyle(thickness, color1);
        mc.graphics.drawCircle(0, 0, r1);
        mc.graphics.drawCircle(0, 0, r2);
        mc.graphics.lineStyle(r2 - r1, color2);
        mc.graphics.drawCircle(0, 0, (r2 + r1) / 2);
        mc.x = px;
        mc.y = py;
    }

    private function init3():void {
        var a:Number = 150;
        var b:Number = 150;

        var i:Number = 0;
        var x1:Number;
        var y1:Number;
        var myShape:Sprite = new Sprite();
        addChild(myShape);

        myShape.graphics.lineStyle(1, 0xff00bb, 1);
        myShape.graphics.moveTo(350, 200);

        while (i < Math.PI * 2) {

            i += (2 / 180 * Math.PI);
            x1 = 200 + b * Math.cos(i);
            y1 = 200 + a * Math.sin(i);

            myShape.graphics.lineTo(x1, y1);
        }
    }

    private function init4():void {
        var a:Number = 150;  //与Y轴相关。
        var b:Number = 150;  //与x轴相关。
        var i:Number = 0;  //设弧度初始值。
        var x1:Number;
        var y1:Number;
        var myShape:Sprite = new Sprite();
        addChild(myShape);
        myShape.graphics.lineStyle(3, 0xff0000, 1);

        // 开始坐标，也是0度角时的坐标（425=COS（0） *150+275，  200=200+SIN（0）*150=200+0*150）。是随直径和圆的位置改变。圆心坐标为（425-75，200）

        myShape.graphics.moveTo(425, 200);
        myShape.addEventListener(Event.ENTER_FRAME, drawCircle);

        function drawCircle(event:Event):void {
            i += (2 / 180 * Math.PI);  //2为角的度数，相当于速度，角度转换为弧度，公式：弧度值=Math.PI/180*角度值。
            x1 = 275 + b * Math.cos(i);  //圆最左边的坐标为：（275=425-150，200）,确定圆的位置。
            y1 = 200 + a * Math.sin(i);
            myShape.graphics.lineTo(x1, y1);
            if (i >= Math.PI * 2) {  //i为弧度值=一周360度*Math.PI/180。
                myShape.removeEventListener(Event.ENTER_FRAME, drawCircle);
            }
        }
    }

    private function init5():void {
        var s:Shape = new Shape();
        s.graphics.lineStyle(2);
        s.graphics.drawCircle(200, 200, 30);
        stage.addChild(s);
    }

    private function init6():void {
        var s:Shape = new Shape();
        s.graphics.beginFill(0xFF0000);
        s.graphics.drawCircle(200, 200, 30);
        s.graphics.drawCircle(200, 200, 28);
        s.graphics.endFill();
        stage.addChild(s);
    }

    private function init7():void {
        // http://www.cuplayer.com/player/PlayerCodeAs/2012/1219608.html
        var a:Number = 150;
        var b:Number = 100;
        var i:Number = 0;
        var myShape:Sprite = new Sprite();

        addChild(myShape);
        myShape.graphics.lineStyle(3, 0xff0000);
        myShape.graphics.moveTo(2 * a, b);
        myShape.addEventListener(Event.ENTER_FRAME, _draw);

        function _draw(event:Event):void {
            i += 0.1;
            var _x:Number = a + a * Math.cos(i);
            var _y:Number = b + b * Math.sin(i);
            myShape.graphics.lineTo(_x, _y);
            if (i >= Math.PI * 2) {
                myShape.removeEventListener(Event.ENTER_FRAME, _draw);
            }
        }
    }
}
}

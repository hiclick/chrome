/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-4-24
 * Time: 上午10:35
 */
package {
import flash.display.MovieClip;
import flash.display.Sprite;

public class Main extends MovieClip{

    public function Main() {

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
}
}

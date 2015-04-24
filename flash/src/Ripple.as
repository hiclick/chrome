/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-4-16
 * Time: 上午11:02
 */
package {


import be.nascom.flash.graphics.Rippler;

import flash.display.Bitmap;
import flash.display.Sprite;
import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.events.MouseEvent;



[SWF(backgroundColor="0x000000", frameRate="30", width="640", height="480")]
public class Ripple extends Sprite
{
    // Embed an image (Flex Builder only, use library in Flash Authoring)
    [Embed(source="../assets/img/Water.png")]
    private var _sourceImage : Class;

    private var _target : Bitmap;
    private var _rippler : Rippler;

    public function Ripple()
    {
        stage.scaleMode = StageScaleMode.NO_SCALE;
        stage.align = StageAlign.TOP_LEFT;

        // create a Bitmap displayobject and add it to the stage
        _target = new Bitmap(new _sourceImage().bitmapData);
        addChild(_target);

        // create the Rippler instance to affect the Bitmap object
        _rippler = new Rippler(_target, 60, 6);

        // create the event listener for mouse movements
        stage.addEventListener(MouseEvent.MOUSE_MOVE, handleMouseMove);
    }

    // creates a ripple at mouse coordinates on mouse movement
    private function handleMouseMove(event : MouseEvent) : void
    {
        // the ripple point of impact is size 20 and has alpha 1
        _rippler.drawRipple(_target.mouseX, _target.mouseY, 20, 1);
    }
}
}

/**
 * Created with IntelliJ IDEA.
 * User: Christen
 * Date: 15-5-28
 * Time: 下午12:45
 */
package note {
import flash.display.Sprite;
import flash.events.MouseEvent;

public class DrawPolygon extends Sprite {

    private var now_sprite:Sprite;

    public function DrawPolygon():void {
        stage.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
    }

    private function mouseDownHandler(_evt:MouseEvent):void {
        now_sprite = addChild(new Sprite) as Sprite;
        now_sprite.blendMode = "layer";
        var _n:uint = uint(Math.random() * 6 + 3);
        now_sprite.addChild(createLVP(_n));
        var _s:Sprite = createLVP(_n);
        _s.scaleX = _s.scaleY = .6;
        _s.blendMode = "erase";
        now_sprite.addChild(_s);
        now_sprite.x = mouseX;
        now_sprite.y = mouseY;
        now_sprite.width = now_sprite.height = 2;
        stage.addEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
        stage.addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
    }

    private function mouseMoveHandler(_evt:MouseEvent):void {
        now_sprite.width = now_sprite.height = Math.abs(mouseX - now_sprite.x) * 2;
    }

    private function mouseUpHandler(_evt:MouseEvent):void {
        now_sprite = null;
        stage.removeEventListener(MouseEvent.MOUSE_MOVE, mouseMoveHandler);
        stage.removeEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
    }

    private static function createLVP(_n:uint):Sprite {
        var _sprite:Sprite = new Sprite;
        _sprite.mouseEnabled = false;
        _sprite.graphics.lineStyle(1, 0, 0);
        _sprite.graphics.beginFill(Math.random() * 0xffffff);
        _sprite.graphics.moveTo(Math.cos(Math.PI * 2) * 100, Math.sin(Math.PI * 2) * 100);
        var _v:uint = _n;
        while (_n--) {
            _sprite.graphics.lineTo(Math.cos(_n / _v * Math.PI * 2) * 100, Math.sin(_n / _v * Math.PI * 2) * 100);
        }
        _sprite.graphics.endFill();
        return _sprite;
    }
}
}

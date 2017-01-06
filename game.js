/**
 * Created by Matvey on 04.01.2017.
 */
function keyMove(surface, vector1, vector2, key) {
    if (surface.keyControl.isDown(key))
        obj.move(v(vector1, vector2));
}

var js = new PointJS('2d', 1000, 800, {backgroundColor: 'blue'});
js.system.initFullPage();
var game = js.game;
var v = js.vector.v2d;
var key = js.keyControl;
key.initKeyControl();
var rect = game.newRectObject({
    x: 100,
    y:500,
    w:50,
    h:50,
    fillColor: "black"
});
var obj = game.newImageObject( {
    file : "space_ship.jpg",
    x : 100,
    y : 100,
    w:278,
    h: 176
});
obj.draw();
rect.draw();
js.camera.setPosition(point(100, 100));
js.game.newLoop("1", function () {
    game.clear();
    js.camera.setPosition(point(100, 100));
    obj.draw();
    rect.draw();

    keyMove(js, 5, 0, "RIGHT");
    keyMove(js, -5, 0, "LEFT");
    keyMove(js, 0, 5, "DOWN");
    keyMove(js, 0, -5, "UP");
});
game.setLoop("1");
game.start();
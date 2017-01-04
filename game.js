/**
 * Created by Matvey on 04.01.2017.
 */

    function keyMove(surface, vector1, vector2, key) {
        if (surface.keyControl.isDown(key))
            rect.move(v(vector1, vector2));
    }


    var js = new PointJS('2d', 400, 300, {backgroundColor: 'blue'});

    var game = js.game;
    var v = js.vector.v2d;
    var key = js.keyControl;
    key.initKeyControl();

    var rect = js.game.newCircleObject({
        x: 140,
        y: 100,
        radius: 20,
        fillColor:'red'

    });
    js.game.newLoop("1", function () {

        js.game.clear();
        keyMove(js, 1, 0, "RIGHT");
        keyMove(js, -1, 0, "LEFT");
        keyMove(js, 0, 1, "DOWN");
        keyMove(js, 0, -1, "UP");

        rect.draw()

    });
    game.setLoop("1");
    game.start();

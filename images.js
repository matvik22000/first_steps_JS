/**
 * Created by Matvey on 04.01.2017.
 */
function keyMove(surface, vector1, vector2, key) {
    if (surface.keyControl.isDown(key))
        obj.move(v(vector1, vector2));
}

var js = new PointJS('2d', 1000, 800, {backgroundColor: "#CCCCCC"});
var point = js.vector.point;

var dr = true;
js.system.initFullPage();
var game = js.game;
var v = js.vector.v2d;
var key = js.keyControl;
var smallmap_size = 100;
var map_size = 15000;
key.initKeyControl();
    var map = game.newRectObject({
        w: 100,
        h: 100,
        fillColor: "black",
        alpha: 0.4
    });
var cell = game.newCircleObject({
   radius:2,
   fillColor: "#FFFFFF"
});
var ammo = [];
cell.setPositionS(point(js.game.getWH().w - 110,js.game.getWH().h - 110));
//cell.setPosition(point(10, 10));

var rect = game.newRectObject({
    x: 100,
    y:500,
    w:50,
    h:50,
    fillColor: "black"
});
var obj = game.newImageObject( {
    file : "tank.jpg",
    x : 100,
    y : 100,
    w:278,
    h: 176
});

var left = game.newRectObject({
    x: 0,
    y:0,
    w: 2,
    h:15000,
    fillColor: "black"


});
var right = game.newRectObject({
    x:15000,
    y: 0,
    w:2,
    h:15000,
    fillColor: "black"

});
var top_stop = game.newRectObject({
    x:0,
    y: 0,
    w:15000,
    h:2,
    fillColor: "black"

});
var bot = js.game.newRectObject({
    x:0,
    y: 15000,
    w:15000,
    h:2,
    fillColor: "black"

});
var turrel = game.newImageObject({
    file: "turrel.png",
    x: js.math.random(0, 14990, true),
    y: js.math.random(0, 14990, true),
    scale: 1
});
var enemy_1 = game.newCircleObject({
    radius: 2,
    fillColor: "red"
});
function min_map_point(obj) {
    return point(obj.getPositionC().x * (smallmap_size / map_size) + js.game.getWH().w - 110,obj.getPositionC().y * (smallmap_size / map_size) + js.game.getWH().h - 110)
}
top_stop.draw();
obj.draw();
rect.draw();
js.camera.setPositionC(obj.getPosition(1));
js.game.newLoop("1", function () {
    if (obj.getPosition().x <= 0)
        obj.move(v(100, 0));
    if (obj.getPosition().y <= 0)
        obj.move(v(0, 100));
    if (obj.getPosition().x >= 15000 - 278)
        obj.move(v(-100, 0));
    if (obj.getPosition().y >= 15000 - 176)
        obj.move(v(0, -100));
    game.clear();
    js.camera.setPositionC(obj.getPosition(1));
    obj.draw();
    rect.draw();
    enemy_1.setPositionS(min_map_point(turrel));
    enemy_1.draw();
    if (dr)
        turrel.draw();
    for (var j; j < ammo.length; j++) {
        ammo[j].drawStaticBox("green");
        if (ammo[j].isStaticIntersect(turrel.getStaticBox()))
          dr = false;
    }
        if (js.keyControl.isDown("UP"))
            obj.moveAngle(-50);

    if (js.keyControl.isDown("DOWN"))
        obj.moveAngle(50);
    if (js.keyControl.isDown("LEFT"))
        obj.turn(5);
    if (js.keyControl.isDown("RIGHT"))
        obj.turn(-5);
    if (js.keyControl.isDown("SPACE")) {
        var circle = game.newCircleObject({
            x: obj.getPositionC().x,
            y: obj.getPositionC().y,
            radius: 5,
            fillColor: "black"

        });
        ammo.push([circle, obj.getAngle() - 180]);
    }


    for (var i = 0; i < ammo.length; i++){

        if (ammo[i][0].getPositionC().x < 0 || ammo[i][0].getPositionC().y < 0 || ammo[i][0].getPositionC().y > 15000 ||ammo[i][0].getPositionC().x > 15000)
            ammo.slice(i, 1);
        else{
            ammo[i][0].moveAngle(7, ammo[i][1]);
            ammo[i][0].draw();}
    }
    map.setPositionS(point(js.game.getWH().w - 110,js.game.getWH().h - 110));
    cell.setPositionS(point(js.game.getWH().w - 110,js.game.getWH().h - 110));
    cell.setPositionS(min_map_point(obj));
    map.draw();
    cell.draw();
    left.draw();
    right.draw();
    bot.draw();
    top_stop.draw();

});
game.setLoop("1");
game.start();
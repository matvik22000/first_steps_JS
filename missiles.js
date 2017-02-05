/**
 * Created by Matvey on 05.02.17.
 */
var js = new PointJS('2d', 0, 0, {backgroundColor: "#31e1e2"});
js.system.initFullPage();
var game = js.game;
var point = js.vector.point;
map = new_small_map(100);
js.keyControl.initKeyControl();
var smallmap_size = 100;
var map_size = 15000;
var cell = game.newCircleObject({
    radius: 2,
    fillColor: "white"

});
function min_map_point(obj) {
    return point(obj.getPositionC().x * (smallmap_size / map_size) + js.game.getWH().w - 110, obj.getPositionC().y * (smallmap_size / map_size) + js.game.getWH().h - 110);
}
var rocket = game.newImageObject({
    file: "rocket.png",
    scale: 1,
    x: 1000,
    y: 1000

});
var plane = game.newImageObject({
    file: "plane.png",
    scale: 1,
    x: 50,
    y: 50
});
var  cell_2 = game.newCircleObject({
    radius: 2,
    fillColor: "red"

});
function intersect(s1_x, s2_x, s1_y, s2_y, s1_size_x, s1_size_y, s2_size_x, s2_size_y){
return (s1_x > s2_x - s1_size_x) && (s1_x < s2_x + s2_size_x) && (s1_y > s2_y - s1_size_y) && (
    s1_y < s2_y + s2_size_y);}
var bg = [];
for (var i = 0 ; i<1000; i++)
    bg.push(game.newImageObject({
        file: "cloud.png",
        scale: 1,
        x: js.math.random(1, 15000, true),
        y: js.math.random(1, 15000, true)


    }));
console.log(bg);
game.newLoop("1", function () {
    game.clear();

    js.camera.setPositionC(plane.getPositionC());
    if (js.keyControl.isDown("UP"))
        plane.moveAngle(-8);

    if (js.keyControl.isDown("DOWN"))
        plane.moveAngle(8);
    if (js.keyControl.isDown("LEFT"))
        plane.turn(2);
    if (js.keyControl.isDown("RIGHT"))
        plane.turn(-2);
    map.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 110));
    cell.setPositionS(point(js.game.getWH().w - 110, js.game.getWH().h - 110));
    cell.setPositionS(min_map_point(plane));
    var angle_r2p = js.vector.getAngle2Points(plane.getPositionC(), rocket.getPositionC());


    console.log(angle_r2p);
    // if (angle_r2p_w > 0) {
    //     if (angle_r2p_w <= 5)
    //         rocket.turn(angle_r2p_w);
    //     else
    //         rocket.turn(5);
    // }
    // if (angle_r2p_w < 0) {
    //
    //     angle_r2p_w += 360;
    //     if (angle_r2p_w <= 5)
    //         rocket.turn(-angle_r2p_w);
    //     else
    //         rocket.turn(-5);
    // }
    rocket.rotateForAngle(angle_r2p, 1.5);



    rocket.moveAngle(-9);
    for (var j = 0; j < bg.length; j++)
        bg[j].draw()

    new_map(15000);
    cell_2.setPositionS(min_map_point(rocket));
    map.draw();
    cell.draw();
    cell_2.draw();
    rocket.draw();
    plane.draw();
     if (rocket.isDynamicInside(plane.getDynamicBox())){
    //if (intersect(plane.getPosition().x, rocket.getPositionC().x, plane.getPosition().y, rocket.getPositionC().y, 200, 200, 0, 0))
         var blast = game.newImageObject({
             file: "blast.png",
             x: plane.getPosition().x,
             y: plane.getPosition().y,
             scale: 1
         });
         blast.draw();
        setTimeout(game.stop(),100)

     }

});
game.setLoop("1");
game.start();
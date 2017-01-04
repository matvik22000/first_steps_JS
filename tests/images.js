/**
 * Created by Matvey on 04.01.2017.
 */
var js = new PointJS("2d", 1000, 800, {backgroundcolor: "white"});
var image = js.game.newImageObject({
    file: "space_ship.jpg",
    x:100,
    y:100,
    w:287,
    h:176
});
image.draw();
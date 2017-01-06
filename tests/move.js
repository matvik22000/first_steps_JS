/**
 * Created by Matvey on 04.01.2017.
 */
function keyMove(surface, vector1, vector2, key) {
    if (surface.keyControl.isDown(key))
        obj.move(v(vector1, vector2));
}

let velocity = p5.Vector.sub(target, position).normalize();

let yaw = atan2(velocity.x, velocity.z);
let pitch = asin(-velocity.y); // minus to look "up" when y is negative (p5.js convention)

//atan2(y, x) gives you the angle (in radians or degrees) between the X-axis and the point (x, y).

//In P5 reference:
//atan2 Calculates the angle formed by a point, the origin, and the positive x-axis.
//atan2() is most often used for orienting geometry to the mouse's position, as in atan2(mouseY, mouseX). The first parameter is the point's y-coordinate and the second parameter is its x-coordinate.
//By default, atan2() returns values in the range -π (about -3.14) to π (3.14). If the angleMode() is DEGREES, then values are returned in the range -180 to 180.

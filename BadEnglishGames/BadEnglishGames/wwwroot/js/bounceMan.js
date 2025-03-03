class Position {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Player {
    position = new Position();

    width = 0;
    height = 0;

    jumpHeight = 0;

    xVelocity = 0;
    yVelocity = 0;
}
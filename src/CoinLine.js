import * as Matter from 'matter-js';

var Bodies = Matter.Bodies,
    Body = Matter.Body;

export default class CoinLine { //todo 需錯誤檢查

    constructor(x, y, lenght, height, angle) {

        this.x = x
        this.y = y;
        this.lenght = lenght;
        this.height = height;
        this.angle = angle;

        this.line = 0;
    }

    toMatter() {
        this.line = Bodies.rectangle(this.x, this.y, this.lenght, this.height, { isStatic: true });
        Body.rotate(this.line, (this.angle / 180) * Math.PI);
        return this.line;
    }

    printOnP5(p) {
        p.push();
        p.translate(this.line.position.x, this.line.position.y);
        p.rectMode(p.CENTER);
        p.rotate(this.line.angle);
        p.rect(0, 0, this.lenght, this.height);
        p.pop();
    }
}
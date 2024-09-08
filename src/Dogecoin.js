import dogecoinImg from './img/dogecoin.png';

var Bodies = Matter.Bodies;

export default class Dogecoin {

    static #dogeImg;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.coin;
        // this.dogeImg;
    }

    toMatter() {
        if(this.coin === undefined) {
            this.coin = Bodies.circle(this.x, this.y, this.size, { frictionAir: 0, friction: 0.005, restitution: 0.9 });
        }
        return this.coin;
    }


    printOnP5(p) {

        if( Dogecoin.#dogeImg === undefined ) {
            Dogecoin.#dogeImg = p.loadImage(dogecoinImg);
        }

        let pos = this.coin.position;

        p.push();
        p.translate(pos.x, pos.y);
        p.rotate(this.coin.angle);


        // p.ellipseMode(p.CENTER);
        p.imageMode(p.CENTER);

        // p.ellipse(0, 0, this.size, this.size);
        let img_size = Math.floor(this.size * 2);
        p.image(Dogecoin.#dogeImg, 0, 0, img_size, img_size);

        p.pop();
    }
}

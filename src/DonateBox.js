import CoinLine from './CoinLine.js';
var World = Matter.World;

export default class DonateBox {

    constructor(size) {

        this.size = size;


        this.lines = [];
        this.create();
    }

    create() {

        
        let boxThickness = 10;
        let boxLeft = 0 - boxThickness;
        let boxRight = this.size + boxThickness;

        let boxHeight = this.size;
        let boxCenterOfHeight = Math.floor(this.size / 2);

        let topLine = new CoinLine(boxCenterOfHeight, -10, boxHeight * 1.2, 10, 0);
        this.lines.push(topLine);


        let leftLine = new CoinLine(boxLeft, boxCenterOfHeight, boxHeight, boxThickness, 90);
        this.lines.push(leftLine);

        let rightLine = new CoinLine(boxRight, boxCenterOfHeight, boxHeight, boxThickness, 90);
        this.lines.push(rightLine);


        let leftSlashLineY = Math.floor(boxHeight / 3);

        let leftSlashLine1 = new CoinLine(Math.floor(leftSlashLineY / 2) , leftSlashLineY, leftSlashLineY * 2, 5, 20);
        this.lines.push(leftSlashLine1);


        let rightSlashLineY = Math.floor(boxHeight / 3) * 2;
        let rightSlashLine1 = new CoinLine(Math.floor(rightSlashLineY), rightSlashLineY, rightSlashLineY*1.2, 5, -20);
        this.lines.push(rightSlashLine1);

        

    }

    toMatterWorld(world) {
        for(let i = 0 ; i < this.lines.length ; i++) {
            World.add(world, this.lines[i].toMatter());
        }
    }

    printOnP5(p) {
        for(let i = 0 ; i < this.lines.length ; i++) {
            this.lines[i].printOnP5(p);
        }
    }

}
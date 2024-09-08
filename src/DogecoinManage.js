import Dogecoin from './Dogecoin.js';

var Composite = Matter.Composite;


export default class DogecoinManage {
    constructor(matterWorld, toDeleteDropHeight) {
        this.dogecoins = [];
        this.matterWorld = matterWorld;
        this.autoCleanTime = 2000;
        this.toDeleteDropHeight = toDeleteDropHeight;

        this.autoClean();
    }

    addToMatter(dogecoin) { // Dogecoin class
        this.dogecoins.push(dogecoin);
        Composite.add(this.matterWorld, dogecoin.toMatter());
    }

    addOneDogecoinToMatter(x, y, size) {
        let dogecoin = new Dogecoin(x, y, size);
        this.addToMatter(dogecoin);
    }

    printOnP5(p) {
        for (let i = 0; i < this.dogecoins.length; i++) {
            this.dogecoins[i].printOnP5(p);
        }
    }

    autoClean() {
        setInterval(() => {
            for (let i = 0; i < this.dogecoins.length; i++) {

                let coin = this.dogecoins[i].toMatter();
                if(coin.position.y > this.toDeleteDropHeight) {

                    Composite.remove(this.matterWorld, coin);

                    let index = this.dogecoins.indexOf(this.dogecoins[i]);
                    this.dogecoins.splice(index, 1); // delete coin
                }
            }
        }, this.autoCleanTime);
    }
}
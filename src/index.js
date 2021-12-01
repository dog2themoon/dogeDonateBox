var $script = require("scriptjs");

import DonateBox from './DonateBox.js';
import DogecoinManage from './DogecoinManage.js';
import DonateRecipient from './DonateRecipient.js';

import getUrlParameter from './unit/GetUrlParameter.js';
import './css/justBox.css';

var Queue = require('sync-queue');
var runDoanteQueue = new Queue();

var Engine = Matter.Engine,
    Runner = Matter.Runner;


let engine = Engine.create();
let world = engine.world;

let runner = Runner.create();
Runner.run(runner, engine);

let donateBox;


let dogecoinManage = new DogecoinManage(world);

let dogecoinAddress = getUrlParameter('dogecoinAddress');
if(dogecoinAddress == false) {
    console.log('Not set dogecoinAddress in URL');
    console.log('..../justBox.html?dogecoinAddress={your dogecoin address}');
    console.log('ex. ..../justBox.html?dogecoinAddress=D6BoLmatJzBUBoikmww1LBYNZFzbbrrh2n');
}

let detectCoinApi = '';
console.log(dogecoinAddress);
if(dogecoinAddress && dogecoinAddress.charAt(1) == 'D') {
    detectCoinApi = 'https://chain.so/api/v2/get_tx_received/DOGE/';
} else {
    detectCoinApi = 'https://chain.so/api/v2/get_tx_received/DOGETEST/';
}




let donateRecipient = new DonateRecipient(dogecoinManage, dogecoinAddress, detectCoinApi);

const runP5 = function(fn) {
    $script("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js", function() {
        fn();
    });
}


const runDonate = function(coins, launchPoint_X, coinSize) {
    runDoanteQueue.place(()=>{
        showDoge()
        .then(()=>{return showDonateBox();})
        .then(()=>{return delay(2);})
        .then(()=>{return startFallCoin(coins, launchPoint_X, coinSize);})
        .then(()=>{return delay(8);})
        .then(()=>{return closeDonateBox();})
        .then(()=>{return closeDoge();})
        .then(()=>{runDoanteQueue.next();});

    });
}

const showDonateBox = function() {
    return new Promise((resolve, reject) => {
        $( "#dogeDonateBox" ).animate({
            opacity: 0.8,
        }, 5000, resolve);
    });
};

const startFallCoin = function(coins, launchPoint_X, coinSize) {
    return new Promise((resolve, reject) => {
        coins = Math.floor(coins);
        donateRecipient.addCoinsV2(coins, launchPoint_X, coinSize, resolve);
    });
}

const closeDonateBox = function() {

    return new Promise((resolve, reject) => {
        $( "#dogeDonateBox" ).animate({
            opacity: 0,
        }, 2000, resolve);
    });
}

const delay = function(s) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, s * 1000);
    });
}

const showDoge = function() {
    return new Promise((resolve, reject) => {
        $( "#doge_img" ).animate({
            opacity: 0.8,
        }, 2000, resolve);
    });
}

const closeDoge = function() {
    return new Promise((resolve, reject) => {
        $( "#doge_img" ).animate({
            opacity: 0,
        }, 2000, resolve);
    });
}






const sketch = (p) => {


    p.setup = function () {
        

        let boxSize = Math.floor(window.innerHeight);
        let coinSize = Math.floor(boxSize / 15);
        let launchPoint_X = 10;

        p.createCanvas(boxSize, boxSize).parent("dogeDonateBox");
        $( "#doge_img" ).width(boxSize);


        donateBox = new DonateBox(boxSize);
        donateBox.toMatterWorld(world);

        let setcoins_n = getUrlParameter('setcoin');
        if(setcoins_n && setcoins_n > 0) {
            test(setcoins_n, launchPoint_X, coinSize);
        }

        let is_running = false;
        if(dogecoinAddress != false) {
            setInterval(()=> {
                if(is_running == false) {
                    donateRecipient.checkNewTXs(function(new_tx) {
                    
                        for(let i = 0 ; i < new_tx.length ; i++) {
                            let coins = Math.floor(new_tx[i].value);
                            runDonate(coins, launchPoint_X, coinSize);
                        }
                    });
                }
    
            }, 1000);
        }
    };

    p.draw = function () {

        p.background(51);
        donateBox.printOnP5(p);
        donateRecipient.printOnP5(p);

    };
};

runP5(()=>{
    new p5(sketch);
})

const test = function(coins, launchPoint_X, coinSize) {
    
    runDonate(coins, launchPoint_X, coinSize);
    runDonate(coins, launchPoint_X, coinSize);
    runDonate(coins, launchPoint_X, coinSize);
}

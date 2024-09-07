import axios from 'axios'

export default class DonateRecipient {

    constructor(dogecoinManage, address, detectCoinApi) { // address:String

        this.detectCoinApi = detectCoinApi
        this.dogecoinManage = dogecoinManage;
        this.address = address;

        this.hasShowed = [];
        this.monitorCycleTime = 10; // 10s
        this.checkDonateTime = 600; // 600s
        this.lastTxidHasShowed;

        // 結構: height, vin
        this.addressReceiveByBlockHeight = [];
    }


    addCoinsV2(n, launchPoint_X, size, complete) {

        for(let i = 0; i < n ; i++) {

            setTimeout(() => {

                this.dogecoinManage.addOneDogecoinToMatter(launchPoint_X, 0, size);

                if(i === (n-1)) {
                    complete();
                }
            },50 * i);

        }
    }

    printOnP5(p) {
        this.dogecoinManage.printOnP5(p);
    }

    runCoinAnimation(runFn) {
        if (this.addressReceiveByBlockHeight.length === 0) {
            return;
        }


        let notRunCoinAnimationReceive = this.addressReceiveByBlockHeight.find((val) => {
            return val.isRunCoinAnimation === false
        })

        if (notRunCoinAnimationReceive !== undefined) {
            runFn(notRunCoinAnimationReceive.vin);
            notRunCoinAnimationReceive.isRunCoinAnimation = true;
        }

        console.log("in runCoinAnimation");
        console.log(this.addressReceiveByBlockHeight);
    }

    updateCoinReceiveFromBlock() {
        let req_url = 'http://localhost:3001/GetLatestBlockAddress';

        let new_tx = [];

        axios.get(req_url)
        .then( (response) => {
            console.log("franky-test");
            console.log(response);

            const blockInfoList = response.data;

            blockInfoList.forEach(blockInfo => {

                let totalVin = 0;
                blockInfo.blockTxAboutAddressInfo.eachAddressVinList.forEach((eachAddressVin) => {

                    if (eachAddressVin.address !== this.address) {
                        return;
                    }
                    totalVin += eachAddressVin.vin;

                })

                if (totalVin > 0) {

                    const isExist = this.addressReceiveByBlockHeight.find((val) => {
                        return val.height === blockInfo.height
                    });

                    if (isExist === undefined) {
                        this.addressReceiveByBlockHeight.push({
                            height: blockInfo.height,
                            vin: totalVin,
                            isRunCoinAnimation: false
                        })
                    }
                }
            });

            console.log("this.addressReceiveByBlockHeight");
            console.log(this.addressReceiveByBlockHeight);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    checkNewTXs(haveNewTX_fn) {
        let req_url = '';
        let base_req_url = this.detectCoinApi;

        let new_tx = [];

        if(this.lastTxidHasShowed === undefined) {
            req_url = base_req_url + this.address;
        } else {
            req_url = base_req_url + this.address + '/' + this.lastTxidHasShowed;
        }

        axios.get(req_url)
        .then( (response) => {

            let txs = response.data.data.txs;
            
            for(let i = 0 ; i < txs.length ; i++) {

                let coinsTimestamp = txs[i].time;
                let coinsTxid = txs[i].txid;

                let currentTimestamp  = Math.floor(Date.now() / 1000);

                let isDonateCoinInTime = (currentTimestamp - coinsTimestamp) < this.checkDonateTime;

                if ( isDonateCoinInTime  && this.findTxid(coinsTxid) === false) {
                    this.hasShowed.push(txs[i]);
                    new_tx.push(txs[i]);

                }
                if(i == (txs.length - 1)) {
                    this.lastTxidHasShowed = coinsTxid;
                }
            }
            
        }) 
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            haveNewTX_fn(new_tx);
        });
    }


    findTxid(txid) {
        for(let j = 0 ; j < this.hasShowed.length ; j++) {
            if(this.hasShowed[j].txid === txid) {
                return true;
            }
        }
        this.cleanHasShowed();
        return false;
    }

    cleanHasShowed() {
        let currentTimestamp  = Math.floor(Date.now() / 1000);
        for(let i = 0 ; i < this.hasShowed.length ; i++) {
            if(currentTimestamp - this.hasShowed[i].time > this.checkDonateTime) {
                
                let index = this.hasShowed.indexOf(this.hasShowed[i]);
                this.hasShowed.splice(index, 1);

            }
        }
    }



}

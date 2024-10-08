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

        if (n < 1) {
            complete();
            return;
        }

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
        } else {
            console.log("not new Receive");
        }

        // for debug
        // console.log("in runCoinAnimation");
        // console.log(this.addressReceiveByBlockHeight);
    }

    updateCoinReceiveFromBlock() {
        const getLatestBlockAddressApiPath = this.detectCoinApi + "/GetLatestBlockAddress";

        axios.get(getLatestBlockAddressApiPath)
        .then( (response) => {
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

            // for debug
            // console.log("this.addressReceiveByBlockHeight");
            // console.log(this.addressReceiveByBlockHeight);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

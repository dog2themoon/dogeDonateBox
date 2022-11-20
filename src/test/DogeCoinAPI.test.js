

let {get_tx_received} = require('../DogeCoinAPI');


test('test api', async () => {
    let res = await get_tx_received('DTKCDVVmJdmAD1zsZQArXcghb6DATejiKd');
    console.log(res.data.data.txs);
});



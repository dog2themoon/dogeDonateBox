
const axios = require('axios');

async function get_tx_received(address) {
    const detectCoinApi = 'https://chain.so/api/v2/get_tx_received/DOGE/';
    return axios.get(detectCoinApi + address);
}


module.exports = {
    get_tx_received
};



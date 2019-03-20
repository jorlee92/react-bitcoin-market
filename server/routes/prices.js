var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')
// cc.setApiKey('<your-api-key>')

router.get('/', (req, res ) => {
    cc.priceMulti(['BTC', 'ETH','XRP','LTC','EOS','BCH','USDT'], ['USD'])
    .then(prices => {
    res.send(prices);
    // -> { USD: 1100.24, EUR: 1039.63 }
    })
    .catch(console.error)
})
module.exports = router;
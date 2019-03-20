var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')
const constants = {
    ids: {
        "BTC": 1
    },
    modes: {
        "BUY": 1,
        "SELL": 2,
    }
}
router.get('/', async (req, res) => {
    const userID = 1;
    //GET the currently logged in user's history
    const trades = await models.trade.findAll({where: { userId: userID }})
    res.send(trades)
})

module.exports = router;
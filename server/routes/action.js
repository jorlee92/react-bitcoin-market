var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')
const constants = {
    ids: {
        "BTC": 1,
        "ETH": 2,
        "XRP":3,
        "LTC":4,
        "EOS":5,
        "BCH":6,
        "USDT":7

    },
    modes: {
        "BUY": 1,
        "SELL": 2,
    }
}
router.post('/buyCoin', async (req, res) => {
    const userID = 1;
    const user_requested_amount = req.body.amount;
    const user_requested_coin = req.body.coin;
    console.log(user_requested_coin)
    let price = await cc.price(user_requested_coin, ['USD']).catch(err => res.send(err))
    price = price.USD; //Set the price equal to just the USD part of the response.
    const totalPrice = price * user_requested_amount;
    //Check to make sure this is an amount that the user can buy.
    const user = await models.user.findOne({id: userID}) //Returns a full reference to the user
    if(user.dataValues.dollars > totalPrice){
        //Make the purchase, and keep track of it.
        console.log("Adding " + constants.ids[user_requested_coin] )
        const newHolding = await models.holding.create({
            quantity: user_requested_amount,
            currencyId: constants.ids[user_requested_coin],
            userId:userID
        }).catch(err => res.send("Major Error! Failed to add to account"))
        const newTrade = await models.trade.create({
            quantity: user_requested_amount,
            pricepaid: totalPrice,
            mode: constants.modes.BUY,
            userId: userID,
            currencyId: constants.ids[user_requested_coin],

        }).catch(err => { res.send("Major Error! Failed to log trade")})
        res.json({success: true, message: "Successfully made purchase!"})
    } else {
        res.send("You dont have enough money for this purchase!");
    }
})

module.exports = router;
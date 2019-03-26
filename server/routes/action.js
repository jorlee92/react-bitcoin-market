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
    if(req.user){
    const userID = req.user.id;
    const user_requested_amount = req.body.amount;
    const user_requested_coin = req.body.coin;
    let price = await cc.price(user_requested_coin, ['USD']).catch(err => res.send(err))
    price = price.USD; //Set the price equal to just the USD part of the response.
    const totalPrice = price * user_requested_amount;
    //Check to make sure this is an amount that the user can buy.
    const user = await models.user.findOne({id: userID}) //Returns a full reference to the user
    const dollars = user.get("dollars");
    if(user.dataValues.dollars > totalPrice){
        //Make the purchase, and keep track of it.
        const newHolding = await models.holding.create({
            quantity: user_requested_amount,
            currencyId: constants.ids[user_requested_coin],
            userId:userID
        }).catch(err => res.send("Major Error! Failed to add to account", err))
        const newTrade = await models.trade.create({
            quantity: user_requested_amount,
            pricepaid: totalPrice,
            mode: constants.modes.BUY,
            userId: userID,
            currencyId: constants.ids[user_requested_coin],

        }).catch(err => { res.send("Major Error! Failed to log trade")})
        res.json({success: true, message: "Successfully made purchase!"})
        const newDollars = dollars - totalPrice;
        user.set("dollars", Math.ceil(newDollars));
        user.save();
    } else {
        res.send("You dont have enough money for this purchase!");
    }}
    else {
        res.json({error: "you must be logged in to buy coins"})
    }
})

router.get('/leaderBoard',async (req, res) => {
    let price = await cc.priceMulti(['BTC', 'ETH','XRP','LTC','EOS','BCH','USDT'], ['USD']).catch(err => res.send(err))
    models.holding.findAll({ 
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('quantity')), 'quantity']],
        group : ['user.id','currency.id'],
        include:
            [models.currency, models.user],
        })
    .then(results => {
        //Could be a lot better, but the queries would have to be way different.
        const lbObj = {};
        results.forEach(entry => {
            if(lbObj[entry.user.id]){
                const currentItem = lbObj[entry.user.id];
                currentItem.totalPortfolioValue += (price[entry.currency.name].USD * entry.quantity)
            }
            else {lbObj[entry.user.id] = {
                totalPortfolioValue: (price[entry.currency.name].USD * entry.quantity),
                firstName: entry.user.firstName,
                email: entry.user.email,
            }
        }
        })
        res.send(lbObj)
    })

})
module.exports = router;
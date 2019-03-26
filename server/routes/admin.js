var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')

router.get('/loadCoinsToDB', (req, res ) => {
    cc.priceMulti(['BTC', 'ETH','XRP','LTC','EOS','BCH','USDT'], ['USD'])
    .then(prices => {
        const keys = Object.keys(prices);
        keys.forEach( coin => {
            models.currency.create({name: coin})
        })
        res.send(prices);
    })
    .catch(console.error)
})

router.get('/createFakeBuys', (req, res) => {
    models.holding.create({
        quantity: 100,
        currencyId: 1,
        userId:2
    })
    .then(rs => res.send(rs))
    .catch(err => res.send(err))
})

router.get('/fakeUser', (req, res) => {
    models.user.create({firstName:"Jordan", lastName:"Lee", email:"test@.com", password: "password"}).then(d => res.send(d));
  })
  router.get('/fakeUser2', (req, res) => {
    models.user.create({firstName:"Sarah", lastName:"Smith", email:"test@.com", password: "password"}).then(d => res.send(d));
  })
module.exports = router;
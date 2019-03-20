var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')

router.get('/',(req, res) => {
    const user_id = 1; //Todo, dont hard code this, make it based on the session.
    models.holding.findAll(
    { 
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('quantity')), 'quantity']],
        group : ['currency.id'],
        where: {
            userId: user_id
        },
        include:
            [models.currency],
        
    },
).then(results => res.send(results))
})
module.exports = router;
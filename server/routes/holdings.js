var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

global.fetch = require('node-fetch')

router.get('/',(req, res) => {
        if(req.user){
        const user_id = req.user.id; 
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
    }
    else {
        res.json([])
    }
}
    
)
module.exports = router;
var models  = require('../models');
var express = require('express');
var router  = express.Router();

global.fetch = require('node-fetch')

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function(email, password, done) {
    const user = await models.user.findOne({ where: { email: email,password: password } })
    console.log("Found user? " + JSON.stringify(user));
    if(!user){
        console.log("No matching user found")
        return done(null, false, { message: 'Incorrect login.' });
    } else {
        console.log("Found user!")
        return done(null, user);
    }

  }
));

passport.serializeUser(async function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
      const u = await models.user.findOne({ where : {
          id: id
      }})
      done(null, u)
  });

router.post('/register', async (req, res) => {
    if(req.body.email && req.body.password && req.body.first && req.body.last){
        const email = String(req.body.email);
        const first = String(req.body.first);
        const last = String(req.body.last);
        const password = String(req.body.password);
        models.user.create({firstName:first, lastName:last, email:email, password:password}).then(d => res.send(d));
    } else {
        res.status(500).send("Invalid input");
    }
})
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.json({userID: req.user.id, dollars: req.user.dollars})
    } else {
        res.send("You must be logged in to view your profile")
    }
})

router.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' }));
module.exports = router;
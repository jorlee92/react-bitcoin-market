var models  = require('../models');
var express = require('express');
var router  = express.Router();
const cc = require('cryptocompare')

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

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.json({userID: req.user.id})
    } else {
        res.send("You must be logged in to view your profile")
    }
})

router.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' }));
module.exports = router;
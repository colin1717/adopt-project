var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Take Me Home' });
});

router.post('/signup', function(req, res, next) {
  var user = new User({ username: req.body.username });
  User.register(user, req.body.password, function(error) {
    if (error) {
      res.send(error);
    } else {
      req.login(user, function(loginError) {
        if (loginError) {
          res.send(loginError)
        } else {
          res.redirect('/pets')
        }
      });
    }
  });
});

function checkLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/pets', checkLoggedIn, function(req, res, next){
  res.render('pets',{title: 'View Available Pets'});
})

router.get('/petProfile', checkLoggedIn, function(req, res, next){
  res.render('petProfile',{title: 'Take Me Home'});
})

router.post('/login', passport.authenticate('local'), function(req, res, next){
  res.redirect('/pets');
})

router.get('/logout', checkLoggedIn, function(req, res, next) {
  req.logOut();
  console.log('req.logout() finished.')
  res.redirect('/');
  console.log('req.redirect finished')
});

module.exports = router;

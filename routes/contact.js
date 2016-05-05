var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(transport);
var bodyParser = require('body-parser');

var transport = {
    name: 'minimal',
    version: '0.1.0',
    send: function (mail, callback) {
        var input = mail.message.createReadStream();
        input.pipe(process.stdout);
        input.on('end', function () {
            callback(null, true);
        });
    }
};



function checkLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}

//trying to set up contact route
router.get('/contact', checkLoggedIn, function(req, res, next){
  res.render('contact', {title: 'Meet Me'});
})

//handles email to contact and the form
router.post('/contact', function (req, res) {




//mail options
var mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'jeannewdi@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };



transporter.sendMail(mailOpts, function(error,response){
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Meet Me', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Meet Me', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
});
});
module.exports = router;

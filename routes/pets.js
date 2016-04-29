var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pets', { title: 'Adoptable Pets' });
});


module.exports = router;

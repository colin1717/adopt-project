var express = require('express');
var router = express.Router();
var Like = require('../models/like');


/* GET likes */
router.get('/', function(req, res, next){
  Like.find({}, function(err, likes){
    if (err) {
      res.status(500).send();
    } else {
      res.json(likes);
    }
  })
})

/* POST LIKE */
router.post('/', function(req, res, next) {
  var like = new Like(req.body);
  like.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(like);
    }
  });
});

/* Middleware to specify likeId */
router.use('/:likeId', function(req, res, next) {
  Like.findOne({ '_id': req.params.likeId }, function(err, like) {
    if (err) {
      res.status(500).send();
    } else {
      if (like) {
        res.like = like;
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

// GET /likes/:likeId
router.get('/:likeId', function(req, res, next) {
  res.json(res.like);
});

// PUT /likes/:likeId
router.put('/:likeId', function(req, res, next) {
  Like.findByIdAndUpdate(req.params.likeId, { $set: req.body }, function(err, like) {
    if (err) {
      res.status(500).send();
    } else {
      Like.findOne({ '_id': req.params.likeId }, function(err, like) {
        if (err) {
          res.status(500).send();
        } else {
          if (like) {
            res.like = like;
            res.json(like);
          } else {
            res.status(404).send();
          }
        }
      });
    }
  });
});

module.exports = router;

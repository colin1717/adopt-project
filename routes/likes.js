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

/* Get user's likes  */
router.get('/user', checkLoggedIn, function(req, res, next){
  var userId = req.user._id;
  Like.find({ userId: userId }, function(err, likes){
    if (err){
      console.log("GET likes/user didnt work.  Error: " + err);
    } else {
      res.send(likes);
    }
  })
})

function checkLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}

/* POST LIKE */
/* update when ajax call passes in the petId  */
router.post('/', checkLoggedIn, function(req, res, next) {
  var userId = req.user._id;
  var petId = req.body.petId;
  var petName = req.body.petName;
  var petGender = req.body.petGender;
  var petAge = req.body.petAge;
  var petPhoto = req.body.petPhoto;
  var shelterId = req.body.shelterId;
  var petDescription = req.body.petDescription;

  var like = new Like({
    userId: userId,
    petId: petId,
    petName: petName,
    petGender: petGender,
    petAge: petAge,
    petPhoto: petPhoto,
    shelterId: shelterId,
    petDescription: petDescription
  });

  like.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      console.log('this kinda worked');
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

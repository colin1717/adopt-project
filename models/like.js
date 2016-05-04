var mongoose = require('mongoose');

var likesSchema = {
  userId: String,
  petId: String,
  petName: String,
  petGender: String,
  petAge: String,
  petPhoto: String,
  shelterId: String,
  petDescription: String
}

var Like = mongoose.model('Like', likesSchema);
module.exports = Like;

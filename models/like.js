var mongoose = require('mongoose');

var likesSchema = {
  userId: String,
  petId: String
}

var Like = mongoose.model('Like', likesSchema);
module.exports = Like;

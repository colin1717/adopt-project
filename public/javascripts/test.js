function addNewLike(){
  event.preventDefault();

  var newLike = {
    userId: req.params.id,
    petId: petfinder.pet.id
  }

  $ajax({
    url: '/likes',
    method: 'POST',
    dataType: 'json',
    data: newLike
  })
  .done(function(data, textStatus, jqXHR){
    console.log(data);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error posting like. Error: " + textStatus);
  })
}

function getUserLikes(){
  $.ajax({
    url: '/likes/user',
    method: 'GET',
    dataType: 'json',
  })
  .done(function(data, textStatus, jqXHR){
    var userLikes = data;
    console.log(userLikes);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error GETting likes/user.  Error: " + textStatus);
  })
}

function loopThroughUserLikes(userLikes){
  for (var i = 0; i < userLikes.length; i++){
    var like = userLikes[i];
    populateTableSection(like);
  }
}

function populateTableSection(like){
  var petName = like.petName;
  var petGender = like.petGender;
  var petAge = like.petAge;
  var petPhoto = like.petPhoto;
  var petDescription = like.petDescription;

  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name">' + petName +'</p><p class="liked-pet-gender">' + petGender + '</p><p class="liked-pet-age">' + petAge + '</p></div><img src="' + petPhoto + '" alt="" align="center"><div class="likedpet-description">' + petDescription + '</div></div></td>');
}

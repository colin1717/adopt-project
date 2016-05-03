
var petfinder;

$(document).ready(function(){
  getNextPet();
})

$('#nextButton').click(function(){
  getNextPet();
})

$('#likeButton').click(function(){
  addNewLike();
})


function getNextPet(){
  var url = 'http://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&output=full&format=json';

  $.ajax({
    url: url+'&callback=?',
    data: {},
    method: 'GET',
    dataType: 'jsonp',
  })
  .done(function(data, textStatus, jqXHR){
    petfinder = data.petfinder;
    populateInfo(petfinder);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log('getNextPet failed.  Error: ' + textStatus);
  })
}

function populateInfo(petfinder){
  $('#petNameInfo').html(petfinder.pet.name['$t']);
  $('#petGender').html(petfinder.pet.sex['$t']);
  $('#petAge').html(petfinder.pet.age['$t']);
  $('#petDescription').html(petfinder.pet.description['$t']);
  $('#petId').html(petfinder.pet.id['$t']);
  $('#petType').html(petfinder.pet.animal['$t']);

  var petImageHolder = petfinder.pet.media.photos.photo[0];
  var petImageURL = (petImageHolder['$t']);
  var petImage = $('.pet');
  petImage.find('img').attr('src', petImageURL);
}

function addNewLike(){
  event.preventDefault();
  var petId = petfinder.pet.id['$t'];

  var newLike = {
    petId: petId
  }
  console.log(newLike.petId);
  console.log(newLike);

  $.ajax({
    url: '/likes',
    method: 'POST',
    dataType: 'json',
    data: newLike
  })
  .done(function(data, textStatus, jqXHR){
    console.log("ajax done: " + data);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error posting like. Error: " + textStatus);
  })
}

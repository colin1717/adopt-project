
$(document).ready(function(){
  getNextPet();
})

$('#nextButton').click(function(){
  getNextPet();
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
    var petfinder = data.petfinder;
    populateInfo(petfinder);
    console.log(petfinder);
    //using this to test what the path is for objects
    console.log(petfinder.pet.mix['$t']);
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
  $('#petBreed').html(petfinder.pet.animal['$t']);
  $('#petMix').html(petfinder.pet.mix['$t']);

  var petImageHolder = petfinder.pet.media.photos.photo[0];
  var petImageURL = (petImageHolder['$t']);
  var petImage = $('.pet0');
  petImage.find('img').attr('src', petImageURL);


}


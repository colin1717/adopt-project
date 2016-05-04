
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

$('#display-liked').click(function(event){
    navigateToContentSection($('#liked-pets'));
    getUserLikes();
  });
$('#moreInfo').click(function(event){
    navigateToContentSection($('#more-info'));
  });
$('#backToPetsButton').click(function(event){
    navigateToContentSection($('#available-pets'));
  });
$('#backPetsButton').click(function(event){
    navigateToContentSection($('#available-pets'));
  });
$('#contactButton').click(function(event){
    navigateToContentSection($('#contact'));
  });

function getNextPet(){
  var url = 'https://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&output=full&format=json';

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
  $('#petGender').html(petfinder.pet.sex['$t']+"/");
  $('#petAge').html(petfinder.pet.age['$t']);
  $('#petDescription').html(petfinder.pet.description['$t']);
  $('#petId').html(petfinder.pet.id['$t']);
  $('#petType').html(petfinder.pet.animal['$t']);
  $('#petPhoto').html("<img src='" + petfinder.pet.media.photos.photo[2].$t +"'>");

  // var petImageHolder = petfinder.pet.media.photos.photo[2];
  // var petImageURL = (petImageHolder['$t']);
  // var petImage = $('.pet0');
  // petImage.find('img').attr('src', petImageURL);

  //populate moreInfo page

  $('#pet-name').html(petfinder.pet.name['$t']);
  $('#pet-gender').html(petfinder.pet.sex['$t']+"/");
  $('#pet-age').html(petfinder.pet.age['$t']);
  $('#pet-description').html(petfinder.pet.description['$t']);
  $('#pet-photo').html("<img src='" + petfinder.pet.media.photos.photo[2].$t +"' align='center'>");

  //populate contact page
  $('#shelter-name').html(petfinder.pet.shelterId.$t);
  $('#shelter-address').html(petfinder.pet.contact.address1.$t);
  $('#shelter-location').html(petfinder.pet.contact.city.$t+ ", " + petfinder.pet.contact.state.$t + ", " + petfinder.pet.contact.zip.$t);
  $('#shelter-phone').html(petfinder.pet.contact.phone.$t);
  $('#shelter-email').html(petfinder.pet.contact.email.$t);

  console.log(petfinder.pet);
}



function addNewLike(){
  event.preventDefault();
  var petId = petfinder.pet.id.$t;
  var petName = petfinder.pet.name.$t;
  var petAge = petfinder.pet.age.$t;
  var petGender = petfinder.pet.sex.$t;
  var petPhoto = petfinder.pet.media.photos.photo[2].$t;
  var shelterId = petfinder.pet.shelterId.$t;
  var petDescription = petfinder.pet.description.$t;

  var newLike = {
    petId: petId,
    petName: petName,
    petAge: petAge,
    petGender: petGender,
    petPhoto: petPhoto,
    shelterId: shelterId,
    petDescription: petDescription
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

var contentSectionList = [$('#available-pets'), $('#more-info'), $('#contact'), $('#liked-pets')];

function navigateToContentSection(sectionToDisplay){
  $.each(contentSectionList, function(i, contentSection){
    if(contentSection.css('display') != 'none'){
      contentSection.fadeOut('fast', 'linear', function(){
        sectionToDisplay.fadeIn('fast', 'linear');
      });
    }
  });
}

function getUserLikes(){
  $.ajax({
    url: '/likes/user',
    method: 'GET',
    dataType: 'json',
  })
  .done(function(data, textStatus, jqXHR){
    console.log(data);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error GETting likes/user.  Error: " + textStatus);
  })
}

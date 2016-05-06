
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
    clearTable();
    getUserLikes();
  });

$('#likeButton2').click(function(event){
    clearTable();
    addNewLike();
})

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
  showShelterName(petfinder);
    navigateToContentSection($('#contact'));
  });
$('#logout').click(function(event){
  console.log("you clicked logout");
  logout();
})

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

function showShelterName(){
  var shelterId = petfinder.pet.shelterId.$t;
  var url = 'http://api.petfinder.com/shelter.get?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&id='+shelterId+'&format=json';

  $.ajax({
    url: url,
    data: {},
    method: 'GET',
    dataType: 'jsonp',
  })
  .done(function(data, textStatus, jqXHR){
    petfinderShelter = data.petfinder;
    populateContact(petfinderShelter);
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
  $('#shelter-address').html(petfinder.pet.contact.address1.$t);
  $('#shelter-location').html(petfinder.pet.contact.city.$t+ ", " + petfinder.pet.contact.state.$t + ", " + petfinder.pet.contact.zip.$t);
  $('#shelter-phone').html(petfinder.pet.contact.phone.$t);
  $('#shelter-email').html(petfinder.pet.contact.email.$t);

}

function populateContact(petfinderShelter){
  //change id for name shelter
  $('#shelter-name').html(petfinderShelter.shelter.name.$t);
}

function addNewLike(){
  event.preventDefault();
  var petId = petfinder.pet.id.$t;
  var petName = petfinder.pet.name.$t;
  var petAge = petfinder.pet.age['$t'];
  var petGender = petfinder.pet.sex['$t'];
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
  console.log(newLike.petGender);

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
    var userLikes = data;
    loopThroughUserLikes(userLikes);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error GETting likes/user.  Error: " + textStatus);
  })
}

function loopThroughUserLikes(userLikes){
  if (userLikes.length < 1) {
    populateEmptyTable();
  } else if (userLikes.length % 2 === 0) {
    for (var i = 0; i < userLikes.length; i+=2){
      var likeLeft = userLikes[i];
      var likeRight = userLikes[i+1];
      populateTableSection(likeLeft, likeRight);
    }
  } else if (userLikes.length > 2) {
    //plan for the odd numbered animals here
    console.log('odd number of liked animals');
    for (var i = 0; i < userLikes.length - 1; i+=2){
      var likeLeft = userLikes[i];
      var likeRight = userLikes[i+1];
      var lastLike = userLikes[userLikes.length - 1];
      populateTableSection(likeLeft, likeRight);
    }
    populateFinalTableSection(lastLike);
  } else {
    console.log('You have one like');
    var lastLike = userLikes[userLikes.length - 1];
    populateFinalTableSection(lastLike);
  }
}

function populateTableSection(likeLeft, likeRight){
  var petNameLeft = likeLeft.petName;
  var petGenderLeft = likeLeft.petGender;
  var petAgeLeft = likeLeft.petAge;
  var petPhotoLeft = likeLeft.petPhoto;
  var petDescriptionLeft = likeLeft.petDescription;
  var petIdLeft = likeLeft._id;

  var petNameRight = likeRight.petName;
  var petGenderRight = likeRight.petGender;
  var petAgeRight = likeRight.petAge;
  var petPhotoRight = likeRight.petPhoto;
  var petDescriptionRight = likeRight.petDescription;
  var petIdRight = likeRight._id;


  //building out complete table row of 2 columns. Inserting above variables to pull info from the petfinder info.  Also using petId to create unique div Ids for each animal.
  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div data-id="' + petIdRight + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameLeft +' </p><p class="liked-pet-gender">' + petGenderLeft + '</p><p class="liked-pet-age"> ' + petAgeLeft + ' </p></div><img src="' + petPhotoLeft + '" alt="" align="center"><div class="likedpet-description">' + petDescriptionLeft + '</div></div></td><td colspan="6" rowspan="" headers=""><div data-id="' + petIdRight + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameRight +' </p><p class="liked-pet-gender">' + petGenderRight + '</p><p class="liked-pet-age"> ' + petAgeRight + ' </p></div><img src="' + petPhotoRight + '" alt="" align="center"><div class="likedpet-description">' + petDescriptionRight + '</div></div></td></tr>');

  //generate event handlers
  makeClickEventForDiv(petIdLeft);
  makeClickEventForDiv(petIdRight)
}

function populateFinalTableSection(lastLike){
  var petNameLast = lastLike.petName;
  var petGenderLast = lastLike.petGender;
  var petAgeLast = lastLike.petAge;
  var petPhotoLast = lastLike.petPhoto;
  var petDescriptionLast = lastLike.petDescription;
  var petIdLast = lastLike._id;

  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div data-id="' + petIdLast + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameLast +' </p><p class="liked-pet-gender">' + petGenderLast + '</p><p class="liked-pet-age"> ' + petAgeLast + ' </p></div><img src="' + petPhotoLast + '" alt="" align="center"><div class="likedpet-description">' + petDescriptionLast + '</div></div></td>')

  makeClickEventForDiv(petIdLast);
}

function populateEmptyTable() {
  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div class="liked-pet-info"><div class="liked-info">This is where the pets that you\'ve like will appear.  You can come back later and access them anytime you like!</div></div></td>')
}

function clearTable() {
  $('#table').empty();
}

function moreInfoFromUserLikes(likeId) {
  $.ajax({
    url: '/likes/' + likeId,
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data, textStatus, jqXHR){
    var petfinder = data;
    console.log(petfinder);
    $('#pet-name').html(petfinder.petName['$t']);
    $('#pet-gender').html(petfinder.petGender['$t']+"/");
    $('#pet-age').html(petfinder.petAge['$t']);
    $('#pet-description').html(petfinder.petDescription['$t']);
    $('#pet-photo').html("<img src='" + petfinder.petPhoto +"' align='center'>");
    navigateToContentSection($('#more-info'));
  })
  .fail(function(data, textStatus, jqXHR){
    console.log('GET request to likes/:likeId failed. Error: ' + textStatus);
  })
}

function makeClickEventForDiv(likedPetInfoDiv) {
  $('.liked-pet-info').click(function(){
    moreInfoFromUserLikes($(this).data().id);
    console.log($(this).data());
  })
}

function logout(){
  $.ajax({
    url: '/logout',
    method: 'GET',
    dataType: 'jsonp'
  })
  .done(function(data, textStatus, jqXHR){
    console.log("youre logged out");
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error logging out: " + textStatus);
    document.location.reload(true);
  })
}

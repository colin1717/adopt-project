
var petfinder;
var petCount;
var currentPet;
var searchMode= "query";
var location;

window.onload = function() {
  getRandomPet();
}


$('#nextButton').click(function(){
  if(searchMode === "query") {
    getPetFilters();
  }
  else {
    getRandomPet();
  }
})

$('#likeButton').click(function(){
  addNewLike();
})

$('#display-liked').click(function(event){
    navigateToContentSection($('#liked-pets'));
    $('#filters').hide();
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
$('#filter-button').click(function(event){
  $('#filter-button').css('background-color', 'white');
  $('#filter-button').html("<img src='../images/loading.gif'>");
  filters();
  });

$('#filters-link').click(function(event){
  navigateToContentSection($('#filters'));
  });

$('#exit-filters').click(function(event){
  navigateToContentSection($('#available-pets'));
  });
$('#exit-contact').click(function(event){
  navigateToContentSection($('#available-pets'));
  });

function getRandomPet(){
  var url = 'https://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&output=full&format=json';

  $.ajax({
    url: url+'&callback=?',
    data: {},
    method: 'GET',
    dataType: 'jsonp',
  })
  .done(function(data, textStatus, jqXHR){
    console.log(data);
    currentPet= data.petfinder.pet;
    populateInfo(currentPet);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log('getNextPet failed.  Error: ' + textStatus);
  })
}

function showShelterName(){
  var shelterId = currentPet.shelterId.$t;
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

function populateInfo(currentPet){
  $('#petNameInfo').html(currentPet.name.$t);
  $('#petGender').html(currentPet.sex.$t+"/");
  $('#petAge').html(currentPet.age.$t);
  $('#petDescription').html(currentPet.description.$t);
  $('#petId').html(currentPet.id.$t);
  $('#petPhoto').html("<img src='" + currentPet.media.photos.photo[2].$t +"'>");

  //populate moreInfo page

  $('#pet-name').html(currentPet.name['$t']);
  $('#pet-gender').html(currentPet.sex['$t']+"/");
  $('#pet-age').html(currentPet.age['$t']);
  $('#pet-description').html(currentPet.description['$t']);
  $('#pet-photo').html("<img src='" + currentPet.media.photos.photo[2].$t +"' align='center'>");

  //populate contact page
  $('#shelter-address').html(currentPet.contact.address1.$t);
  $('#shelter-location').html(currentPet.contact.city.$t+ ", " + currentPet.contact.state.$t + ", " + currentPet.contact.zip.$t);
  $('#shelter-phone').html(currentPet.contact.phone.$t);
  $('#shelter-email').html(currentPet.contact.email.$t);
  console.log('done');
}

function populateContact(petfinderShelter){
  //change id for name shelter
  $('#shelter-name').html(petfinderShelter.shelter.name.$t);
}

function addNewLike(){
  event.preventDefault();
  var petId = currentPet.id.$t;
  var petName = currentPet.name.$t;
  var petAge = currentPet.age.$t;
  var petGender = currentPet.sex.$t;
  var petPhoto = currentPet.media.photos.photo[2].$t;
  var shelterId = currentPet.shelterId.$t;
  var petDescription = currentPet.description.$t;

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

var contentSectionList = [$('#available-pets'), $('#more-info'), $('#contact'), $('#liked-pets'), $('#filters')];

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
  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div data-id="' + petIdRight + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameLeft +' </p><p class="liked-pet-gender">' + petGenderLeft + '</p><p class="liked-pet-age"> ' + petAgeLeft + ' </p></div><img src="' + petPhotoLeft + '" alt="" align="center"><a class="moreinfo">More Info</a></div></td><td colspan="6" rowspan="" headers=""><div data-id="' + petIdRight + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameRight +' </p><p class="liked-pet-gender">' + petGenderRight + '</p><p class="liked-pet-age"> ' + petAgeRight + ' </p></div><img src="' + petPhotoRight + '" alt="" align="center"><a class="moreinfo">More Info</a></div></td></tr>');

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

  $('#table').append('<tr><td colspan="6" rowspan="" headers=""><div data-id="' + petIdLast + '" class="liked-pet-info"><div class="liked-info"><p class="liked-pet-name"> ' + petNameLast +' </p><p class="liked-pet-gender">' + petGenderLast + '</p><p class="liked-pet-age"> ' + petAgeLast + ' </p></div><img src="' + petPhotoLast + '" alt="" align="center"><a class="moreinfo">More Info</a></div></td>')

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

function filters(location,animal,animalInput,age,ageInput,sex,sexInput){
      animalInput = $('#animal').val();
      ageInput=$('#age').val();
      age="&age=" + ageInput;
      sexInput=$('#sex').val();
      sex="&sex=" + sexInput;
      city = $('#city').val();
      state = $('#state').val();

          if(city && state) {
            location = "&location=" + city + "+" + state;
                }
          // else if(city || state ) {
          //   return alert("Please select city and state");
          //   console.log('city or state');
          // }
          else {
            location = "";
          }

      var arguments = "";
              if(location){
                location = "&location=" + city + "+" + state;
                arguments += location;
              }

              if (animalInput) {
                animal = "&animal=" + animalInput;
                arguments += animal;
              }
              if (ageInput) {
                age = "&age=" + ageInput;
                arguments += age;
              }
              if (sexInput) {
                sex = "&sex=" + sexInput;
                arguments += sex;
              }

        if (arguments === "") {
          getRandomPet();
          onclickFilterSubmit();
          searchMode = "random";
        }
  else {
    var url = 'http://api.petfinder.com/pet.find?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394'+arguments+'&format=json&count=1000';

    $.ajax({
      url: url,
      data: {},
      method: 'GET',
      dataType: 'jsonp',
    })
    .done(function(data, textStatus, jqXHR){
      console.log(arguments);
      console.log(url);
      petfinder = data.petfinder.pets.pet;
      petCount = 0;
      currentPet= petfinder[petCount];
      populateInfo(currentPet);
      onclickFilterSubmit();
      searchMode = "query";
      // console.log(data.petfinder.pets.pet[0].age.$t);
      console.log(url);
    })
    .fail(function(data, textStatus, jqXHR){
      console.log('filter failed.  Error: ' + textStatus);
    })
  }
}

function getPetFilters(){
  petCount++;
  currentPet= petfinder[petCount];
  populateInfo(currentPet);
  console.log(currentPet);
}
function onclickFilterSubmit() {
        $('#filters').hide();
        $('#available-pets').show();
        $('#exit-filters').show();
        $('#filter-button').html("Submit");
        $('#filter-button').css('background-color', 'transparent');
    }

function logout(){
  console.log('logout is running');
  $.ajax({
    url: '/logout/',
    data:{},
    method: 'GET',
    dataType: 'jsonp'
  })
  .done(function(data, textStatus, jqXHR){
    console.log('ajax call success');
  })
  .fail(function(data, textStatus, jqXHR){
    console.log('Logout failed. Error: ' + textStatus);
    document.location.reload();
  })
}


$(document).ready(function(){

//Function triggers a button click on page load, so that the elements are populated with the first animal
  $(function() {
    $("#nextButton").trigger("click");
  });
//-----------------end trigger event---------------------------------------------------------------------------------------------


//The following invokes an ajax call to the petFinder API when user clicks on the #nextButton------------------------------------

 $("#nextButton").click(function(e) {


  // the following URL returns all animals (cats, dogs, etc)
  /*var url = 'http://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&output=full&format=json';*/

  //The following url just gets dogs
  var url = 'http://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&shelterid=KY305&output=full&format=json';/**/
  $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'jsonp',
        success : function(data) {

            // stores result
            var result = '';

            // set a variable of petfinder equal to the data passed into the success function
            var petfinder = data.petfinder;

//-----------All of the following in the console.log()  are tests to ensure we're getting the proper data for the pets from the API-----------------------
            console.log(petfinder.pet.name['$t']);
            console.log(petfinder.pet.animal['$t']);
            console.log(petfinder.pet.sex['$t']);
            console.log(petfinder.pet.age['$t']);
            console.log(petfinder.pet.description['$t']);
            console.log(petfinder.pet.id['$t']);

//---------Sets the element with the id of petNameInfo's html equal to the pet name-----------------------------------------------
             $('#petNameInfo').html(petfinder.pet.name['$t']);

//---------Sets the element with the id of petGender's html equal to the pet gender-----------------------------------------------
             $('#petGender').html(petfinder.pet.sex['$t']);

//---------Sets the element with the id of petAge's html equal to the pet age-----------------------------------------------
             $('#petAge').html(petfinder.pet.age['$t']);


/*The petImageHolder, gets the pet image in the object[0] of the array, petImageURL, takes
the value of the url stored in the text of petImageHolder and places it into a url. Then, I've declared a variable of favorite and set it equal to the div with the class of dog. From
there, we're doing a find an image in the favorite class and set the source attribute equal to  the url we've placed in the petImageURL varialbe*/


            var petImageHolder = petfinder.pet.media.photos.photo[0];
            var petImageURL = (petImageHolder['$t']);
            var petImage = $('.pet0');
            petImage.find('img').attr('src', petImageURL);


//-------------------------END OF IMAGE PLACEMENT-----------------------------------------------------------------------


        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
      });
     });
});


funtion getNextPet(){
  var url = 'http://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&shelterid=KY305&output=full&format=json';

  $.ajax({
    url: url+'&callback=?',
    method: 'GET',
    dataType: 'jsonp',
  })
  .done(function(data, textStatus, jqXHR){
    petfinder = data.petefinder;
    populateInfo(petfinder);
    console.log(petfinder);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log('getNextPet failed.  Error: ' + textStatus);
  })
}

function populateInfo(petfinder){
  $('#petNameInfo').html(petfinder.pet.name['$t']);
  $('#petGender').html(petfinder.pet.sex['$t']);
  $('#petAge').html(petfinder.pet.age['$t']);
  var petImageHolder = petfinder.pet.media.photos.photo[0];
  var petImageURL = (petImageHolder['$t']);
  var petImage = $('.pet0');
  petImage.find('img').attr('src', petImageURL);
}


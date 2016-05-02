
$(document).ready(function(){

 $("#testButton").click(function(e) {
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

//-----------All of the following in the console.log() get the proper data for the pets from the API-----------------------
            console.log(petfinder.pet.name['$t']);
            console.log(petfinder.pet.animal['$t']);
            console.log(petfinder.pet.sex['$t']);
            console.log(petfinder.pet.age['$t']);
            console.log(petfinder.pet.description['$t']);
            console.log(petfinder.pet.id['$t']);

//---------Sets the p with the id of petNameInfo's html equal to the pet name-----------------------------------------------
             $('#petNameInfo').html(petfinder.pet.name['$t']);


/*The petImageHolder, gets the pet image in the object[0] of the array, petImageURL, takes
the value of the url stored in the text of petImageHolder and places it into a url. Then, I've declared a variable of favorite and set it equal to the div with the class of dog. From
there, we're doing a find an image in the favorite class and set the source attribute equal to  the url we've placed in the petImageURL varialbe*/
            var petImageHolder = petfinder.pet.media.photos.photo[0];
            var petImageURL = (petImageHolder['$t']);
            var favorite = $('.dog');
            favorite.find('img').attr('src', petImageURL);

//-------------------------END OF IMAGE PLACEMENT-----------------------------------------------------------------------


        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
      });
     });
});






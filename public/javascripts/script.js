$(document).ready(function(){

 $("#testButton").click(function(e) {
  var url = 'http://api.petfinder.com/pet.getRandom?key=7fe69d8a1ef29360d4fcf36d90a09254f554a394&shelterid=KY305&output=full&format=json';
  $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'jsonp',
        success : function(data) {
            // stores result
            var result = '';
            //
            var petfinder = data.petfinder;

            console.log(petfinder.pet.name['$t']);
            console.log(petfinder.pet.animal['$t']);
            console.log(petfinder.pet.sex['$t']);
            console.log(petfinder.pet.age['$t']);
            console.log(petfinder.pet.description['$t']);
            console.log(petfinder.pet.id['$t']);

            var petImageHolder = petfinder.pet.media.photos.photo[0];
            var petImageURL = (petImageHolder['$t']);
            var favorite = $('.dog');

            favorite.find('img').attr('src', petImageURL);

            $('#petNameInfo').html(petfinder.pet.name['$t']);


            var infoHTML = '<ul>';
            infoHTML += '<li>';
            infoHTML += '<strong>Description</strong><br>';
            infoHTML += petfinder.pet.description['$t'];
            infoHTML += petfinder.pet.animal['$t'];
            infoHTML += '</li>';

            infoHTML += '</li>';

            infoHTML += '</ul>';
            // return infoHTML;
            $('#petfinderInfo').html(infoHTML);

            // $('#petfinderInfo').html(petfinder.pet.description['$t']);
            //
            console.log(petfinder);
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
      });
     });
});







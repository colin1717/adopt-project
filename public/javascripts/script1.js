$(document).ready(function(){
  var dogId;

  function getNextDog() {
    $.ajax({
      url: '/pets',
      method: 'GET',
      dataType: 'json',
      success: function(dogData) {
        if (dogData.status) {
          $('.dog').html('');
          alert(dogData.status);
        } else {
          dogId = dogData._id;

          $('.dog').html(
            '<img src="' + dogData.photo + '"/>' +
            '<div class="dog-name">' + dogData.name + "<br> " + dogData.age + ' years </div>'
          );
        }
      }
    });
  };

  getNextDog();

  $('.hot-button').click(function(event){
    var liked = $(event.currentTarget).hasClass('hot-button');


$.ajax({
      url: '/pets/' + dogId,
      method: 'PUT',
      dataType: 'json',
      data: {liked: liked},
      success: function(dogData) {
        getNextDog();
        $('#liked-dogs').append('<div class="liked-dog-name"><img src="' + dogData.photo + '"/>' + "<br> " + dogData.name + "<br> " + dogData.age + ' years </div><br>' );
      }
    });
  });

  $('.not-hot-button').click(function(event){
    var notliked = $(event.currentTarget).hasClass('not-hot-button');


$.ajax({
      url: '/pets/' + dogId,
      method: 'PUT',
      dataType: 'json',
      data: {liked: notliked},
      success: function(dogData) {
        getNextDog();
      }
    });
  });
  $('#exit').click(function(event){
    navigateToContentSection($('#main'));
  });
$('#display-liked').click(function(event){
    navigateToContentSection($('#liked'));
  });
});

var contentSectionList = [$('#main'), $('#liked')];

function navigateToContentSection(sectionToDisplay){
  $.each(contentSectionList, function(i, contentSection){
    if(contentSection.css('display') != 'none'){
      contentSection.hide('slow', function(){
        sectionToDisplay.show('slow');
      });
    }
  });
}

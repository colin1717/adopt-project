

var background = setInterval(changeBackground, 8000);
var backgroundImages=["../images/background-1.jpg", "../images/background-3.jpg", "../images/background-2.jpg"];

function changeBackground() {
  var backgroundImage = backgroundImages.shift();
  backgroundImages.push(backgroundImage);

    document.body.style.backgroundImage = "url(" + backgroundImage + ")";
}

$('#login-link').click(function(event){
    displayForm($('#login'), $('#signup-form'));
  });

$('#signup-link').click(function(event){
    displayForm($('#signup-form'), $('#login'));
  });


function displayForm(formToDisplay, formToHide){
    if(formToDisplay.css('display') == 'none' && formToHide.css('display') == 'none'){
      formToDisplay.show();
      console.log("no forms visible");
    }
    else {
      formToHide.hide();
      formToDisplay.show();
      console.log("make forms visible");
    }
      };




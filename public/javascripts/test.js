function addNewLike(){
  event.preventDefault();

  var newLike = {
    userId: req.params.id,
    petId: petfinder.pet.id
  }

  $ajax({
    url: '/likes',
    method: 'POST',
    dataType: 'json',
    data: newLike
  })
  .done(function(data, textStatus, jqXHR){
    console.log(data);
  })
  .fail(function(data, textStatus, jqXHR){
    console.log("Error posting like. Error: " + textStatus);
  })
}

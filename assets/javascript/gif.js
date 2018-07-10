
var bands = ["Nirvana", "Radiohead", "Foo Fighters", "The cure", "Gorilaz"];

// append button
  function addBand(topic){
    var button = $('<button>').text(topic);
    
    button.addClass(topic)
    button.addClass("animate")
    
    $("#bandButtons").append(button);
  }

//loop over the bands and add buttons to the div #addButtons
  for (index=0; index<bands.length; index++){
    addBand(bands[index]);
  }

  $('#submit').on('click', function(){
    event.preventDefault();
    var topic = $('input').val();

    bands.push(topic);

    addBand(topic); 

});


// Click button to show gifs
$(document).on("click", "button", function() {
  var search = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=03WzVFEOa3NyVjfMz23UTGJ6oM8U3B7s&q="+ search + "&limit=10&offset=0&lang=en"

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    $("#gif").empty();
    var link, image;
   	for (i=0; i<11; i++){
   		linkStill = response.data[i].images.fixed_height_still.url;
   		linkAnimate = response.data[i].images.fixed_height_downsampled.url;

  		// result.push(link)	
  		image = $("<img>").attr("src", linkStill);
  		image.attr("data-animate", linkAnimate);
  		image.attr("data-still", linkStill); 
  		image.attr("data-state", "still"); 
  		$("#gif").append(image);

  		$("#gif").css("background-color", "black");

    	}
	});
});

$(document).on("click", "img", function(){

	var image = $(this).data("state");
	var animate = $(this).data("animate");
	var stop = $(this).data("still");

	if (image = "still"){

		$(this).attr("src", animate);
		$(this).attr("data-state", "animate");
	
	}else if (image = "animate"){

		$(this).attr("src", stop);
		$(this).attr("data-state", "still");

	}	

});













$(document).ready(function () {
  var topics = ["Bird","Eevee","Puppies"];
//Let the previous topics display as buttons
  for(i = 0; i < topics.length; i++) {
    var button = $("<button>" + topics[i] + "</button>").addClass("btn btn-primary").attr("data-person",topics[i]);
    $("#buttons").append(button)
  };
//Function to creates new buttons
  function makeButtons () {
    // For some reason, the prior 3 buttons were held in the cache; so, we have to empty them
    $("#buttons").empty();

    for(i = 0; i < topics.length; i++) {
      var button = $("<button>")
      button.addClass("btn btn-primary")
      button.attr("data-person",topics[i]);
      button.text(topics[i]);
      $("#buttons").append(button);
    };
  };
//Click even for the buttons to pull the images from the api and place them into the givDiv
  $("#buttons").on("click",".btn",function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        
          
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var Image= $("<img>");

          Image.attr("src", results[i].images.fixed_height_still.url);
	 			  Image.attr("data-still", results[i].images.fixed_height_still.url);
	 			  Image.attr("data-animate", results[i].images.fixed_height.url);
	 			  Image.attr("data-state", "still");
          Image.attr("class", "rawr");
          $(".item").css({"float": "left", "margin": "50px 20px 0px 20px",});
           

          gifDiv.append(Image);
          gifDiv.prepend(p);
         

          $("#gifs").prepend(gifDiv);
          console.log(Image);
        }
        $(".rawr").on("click", function() {
          event.preventDefault();
          console.log("click!");
          
          var state = $(this).attr("data-state");
          var animate= $(this).attr("data-animate");
          var still = $(this).attr("data-still");
          
        
          if (state ==="still") 
            {
              $(this).attr("src", animate);
              $(this).attr("data-state","animate");
            }
            else
            {
              $(this).attr("src", still);
              $(this).attr("data-state","still");    
            }
          
          
        });
      });
  });
  
//Click the submit button to make a new button
  $("#button").on("click", function() {
    event.preventDefault();
    var more = $("#bar").val();
    topics.push(more);
    console.log(topics);
    console.log(more);
    makeButtons();
  });
});
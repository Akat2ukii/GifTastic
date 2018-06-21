$(document).ready(function () {
  var topics = ["Bird","Eevee","Puppies"];

    for(i = 0; i < topics.length; i++) {
      var button = $("<button>" + topics[i] + "</button>").addClass("btn btn-primary").attr("data-person",topics[i]);
      $("#buttons").append(button);
    };
  function makeButtons () {
  var topics = ["Bird","Eevee","Puppies"];

    for(i = 0; i < topics.length; i++) {
      var button = $("<button>" + topics[i] + "</button>").addClass("btn btn-primary").attr("data-person",topics[i]);
      $("#buttons").append(button);
    };
  };
  
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

          var p = $("<span>").text("Rating: " + rating);

          var Image= $("<img>");

          Image.attr("src", results[i].images.fixed_height_still.url);
	 			  Image.attr("data-still", results[i].images.fixed_height_still.url);
	 			  Image.attr("data-animate", results[i].images.fixed_height.url)
	 			  Image.attr("data-state", "still")
          Image.addClass("gif");
          $(".gif").css({ "float": "left", "margin": "50px 20px 0px 20px",});
           

          gifDiv.append(Image);
          gifDiv.prepend(p);
         

          $("#gifs").prepend(gifDiv);
          console.log(Image);
        }
      });
  });
  // I can't seem to get the computer to recogonise this as a click function as it doesn't return the console.log
  $(".gif").on("click", function() {
    event.preventDefault();
    var state = $(this).attr("data-state");
    console.log("Derp");
  
    if (state ==="still") 
      {
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else
      {
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");    
      }
    
    
  });
  // Seems that I have an issue with adding the value properly as a button. It does display in the console, but only for a split second
  $("#button").on("click", function() {
    var more = $("#bar").val();
    topics.push(more);
    console.log(more);
    makeButtons();
  });
});
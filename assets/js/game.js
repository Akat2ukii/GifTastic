$(document).ready(function () {
  var topics = ["Bird","Eevee","Puppies"];

    for(i = 0; i < topics.length; i++) {
      var button = $("<button>" + topics[i] + "</button>").addClass("btn btn-primary").attr("data-person",topics[i]);
      $("#buttons").append(button);
    };
  function makeButtons () {
    $("#buttons").empty();

    for(i = 0; i < topics.length; i++) {
      var button = $("<button>")
      button.addClass("btn btn-primary")
      button.attr("data-person",topics[i]);
      button.text(topics[i]);
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

          var p = $("<p>").text("Rating: " + rating);

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
    
    var state = $(this).attr("data-state");
    
  
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
  $("#button").on("click", function() {
    event.preventDefault();
    var more = $("#bar").val();
    topics.push(more);
    console.log(topics);
    console.log(more);
    makeButtons();
  });
});
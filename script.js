var Search = (function () {


    var search_object = {};


    search_object.init = function () {
        //listens for the button click
        search_object.browse();
        //hides the results panel
        $('#results-panel').hide();
    }

    search_object.browse = function () {
        $('.btn.btn-primary.btn-lg').click(function() {
                $('.panel.panel-default').hide();
                $('#results-panel').show();
                for(count = 0; count < 10; count++){
                    var id = search_object.number_generate(); //create a random IMDB title id
                    search_object.ajax_request(id); //request that title from the API
                    //The ajax_request function the passes the object returned from the request to
                    //to the div_constructor method at line 68, see you there!
            }
        });
    };

    //random number generator function that passes the id parameter to ajax
    search_object.number_generate = function () {
        var id = Math.floor(Math.random() * (2999999 - 1000000 + 1)) + 1000000;
        return id;
    };

    //This function makes a request for one movie
    search_object.ajax_request = function (id) {

        $.ajax({
 
                // The URL for the request
            url: "http://www.omdbapi.com/?",
         
            // The data to send (will be converted to a query string)
            data: {
                i: "tt" + id,
            },
         
            // Whether this is a POST or GET request
            type: "GET",
         
            // The type of data we expect back
            dataType : "json",

            //when we have a successful query we'll make a new div and
            //append it to main div
            success: function(data){
                //log the data that we've received
                console.log(data);
                //sometimes we get a successful query but the Object returned has some error
                //which is indicated by a false in the "Response" variable. If we get a false 
                //Response we'll simply... well... hold on...
                if (data.Response == "False") {
                    var new_id = search_object.number_generate();
                    search_object.ajax_request(new_id);
                } else { 
                    //we send the data to the div_constructor function which 
                    //builds a div for the result and appends it to the page using jQuery.
                    search_object.div_constructor(data); 
                }
            },

            error: function(xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown + " | Status: " + status);
                console.dir(xhr);
            },

            complete: function(xhr, status) {
                console.log("Status: " + status);
            }
        });
    };

    //this function builds the divs that will house the data from the
    //results of the ajax requests.
    search_object.div_constructor = function(data) {
        var title = data.Title; //turning these into variables for ease of reading
        var year = data.Year;
        var runtime = data.Runtime;
        var director = data.Director;
        var actors = data.Actors;
        $('.list-group').append("<li class='list-group-item'><div class='result'></div></li>");
        $('.list-group-item:last-child .result').append("<h1>" + title + "</h1>");
        $('.list-group-item:last-child .result').append("<h2> " + year + " " + runtime + "</h2>");
        $('.list-group-item:last-child .result').append("<p>Directed By: " + director + " Actors: " + actors + "</p>");
        //return result_div;
    }

    return search_object;
})();

$(document).ready(function () {
    Search.init();
});


/** $.ajax({
 
    // The URL for the request
    url: "http://www.omdbapi.com/?",
 
    // The data to send (will be converted to a query string)
    data: {
        i: tt1285016
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    dataType : "json",
})

    .done(function( json ) {
         $( "<h1>" ).text( json.title ).appendTo( "body" );
         $( "<div class=\"content\">").html( json.html ).appendTo( "body" );
    })
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
      // Code to run regardless of success or failure;
      .always(function( xhr, status ) {
        alert( "The request is complete!" );
    });
**/
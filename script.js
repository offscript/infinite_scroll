//Okay lets just make a div really really quick

var Search = (function () {

    //random number generator function that passes a i parameter to ajax

    var search_object = {};

    search_object.init = function () {

        search_object.browse();
    }

    //initialization method which house ancillary functions

    search_object.browse = function () {
        id = search_object.number_generate();
        $('.col-md-12').click(function() {
            alert(id);   
        });
    };

    search_object.number_generate = function () {
        var randNum = Math.floor(Math.random() * (2999999 - 1000000 + 1)) + 1000000;
        return randNum;
    };

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
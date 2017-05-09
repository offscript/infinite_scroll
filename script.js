var Search = (function () {

    //I wanted to use the module pattern but didn't have anything I needed to put in an 
    //object, so this is empty. 
    var search_object = {};

    //list of *approved* movies
    var movieIds = [
    'tt0111161', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0110912', 
    'tt0060196', 'tt0108052', 'tt0050083', 'tt0167260', 'tt0137523', 
    'tt0120737', 'tt0080684', 'tt1375666', 'tt0109830', 'tt0073486', 
    'tt0167261', 'tt0099685', 'tt0133093', 'tt0076759', 'tt0047478', 
    'tt0317248', 'tt0114369', 'tt0114814', 'tt0102926', 'tt0038650', 
    'tt0064116', 'tt0110413', 'tt0118799', 'tt0034583', 'tt0082971', 
    'tt0120586', 'tt0054215', 'tt0047396', 'tt0120815', 'tt0021749', 
    'tt0245429', 'tt1675434', 'tt0027977', 'tt0103064', 'tt0209144', 
    'tt0253474', 'tt0043014', 'tt0120689', 'tt0057012', 'tt0078788', 
    'tt0407887', 'tt0172495', 'tt1065073', 'tt0088763', 'tt0078748', 
    'tt1345836', 'tt0482571', 'tt0405094', 'tt1853728', 'tt0032553', 
    'tt0110357', 'tt0081505', 'tt0095765', 'tt0169547', 'tt0050825', 
    'tt2015381', 'tt0910970', 'tt0053125', 'tt0090605', 'tt0033467', 
    'tt0211915', 'tt0052357', 'tt0435761', 'tt0022100', 'tt0082096', 
    'tt0364569', 'tt0119698', 'tt0066921', 'tt0075314', 'tt0086190', 
    'tt0095327', 'tt0105236', 'tt0036775', 'tt0087843', 'tt0180093', 
    'tt0112573', 'tt0056592', 'tt0056172', 'tt0338013', 'tt0051201', 
    'tt0093058', 'tt0045152', 'tt0070735', 'tt0040522', 'tt0086879', 
    'tt0071853', 'tt0208092', 'tt0119488', 'tt0042192', 'tt0042876', 
    'tt0053604', 'tt0059578', 'tt0040897', 'tt0053291', 'tt0041959', 
    'tt0012349', 'tt0097576', 'tt0361748', 'tt1832382', 'tt0062622', 
    'tt0372784', 'tt0055630', 'tt0017136', 'tt0114709', 'tt0105695', 
    'tt0081398', 'tt0086250', 'tt0071315', 'tt1049413', 'tt0095016', 
    'tt0363163', 'tt0057115', 'tt0986264', 'tt0031679', 'tt0457430', 
    'tt0047296', 'tt0113277', 'tt0050212', 'tt2106476', 'tt1187043', 
    'tt0993846', 'tt0050976', 'tt0119217', 'tt0096283', 'tt0080678', 
    'tt0050986', 'tt0015864', 'tt0089881', 'tt0083658', 'tt0120735', 
    'tt0017925', 'tt0044741', 'tt0292490', 'tt1205489', 'tt1877832', 
    'tt1305806', 'tt0118715', 'tt0032976', 'tt0112641', 'tt1291584', 
    'tt0434409', 'tt0025316', 'tt0077416', 'tt0061512', 'tt1979320', 
    'tt0347149', 'tt0116282', 'tt0892769', 'tt0033870', 'tt0117951', 
    'tt0031381', 'tt0758758', 'tt0405508', 'tt0055031', 'tt0395169', 
    'tt0268978', 'tt2024544', 'tt0167404', 'tt0046912', 'tt0084787', 
    'tt0064115', 'tt0266697', 'tt0477348', 'tt0266543', 'tt0091763', 
    'tt0046268', 'tt0978762', 'tt0079470', 'tt2278388', 'tt0401792', 
    'tt0075686', 'tt0074958', 'tt0052311', 'tt0046911', 'tt1255953', 
    'tt0093779', 'tt0092005', 'tt0245712', 'tt0469494', 'tt0052618', 
    'tt0032138', 'tt0848228', 'tt0405159', 'tt0032551', 'tt0053198', 
    'tt1028532', 'tt0107207', 'tt0036868', 'tt0440963', 'tt0246578', 
    'tt0060827', 'tt0044079', 'tt0083987', 'tt0056801', 'tt0087544'
    ];


    search_object.init = function () {
        //listens for the button click so that we can 
        //return movie results with main button on the first panel via the browse function
        search_object.button_click();
        //initially hides the results panel until the button is clicked
        $('#results-row').hide();
    }

    search_object.button_click = function () {
        $('.btn.btn-primary.btn-lg').click( function() {
            //hides the initial panel containing the button
            $('#opening-panel').hide();
            $('#results-row').show();
            //start the browse function
            search_object.browse();
            //Listen for when the user reaches the bottom of the page
            search_object.infinite_scroll();
        });
    }

    //checks for when the user reaches the bottom of the page then retreives 10 more
    //movie results using the browse function.
    search_object.infinite_scroll = function () {
        $(window).scroll(function(event) {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 25) {
                search_object.browse();
            }
        });
    }
           

    search_object.browse = function () {
        //hide the results panel while it loads
        $('#results-panel').hide();
        console.log('browse');
        for(count = 0; count < 10; count++){
            var id = search_object.number_generate(); //retrieve a title from our movieIDs list
            search_object.ajax_request(id); //request that title from http://www.omdbapi.com/'s API
            //The ajax_request function the passes the object returned from the request to
            //to the div_constructor method at line 139.
            console.log(count);
        }
        $('#results-panel').show();
    };

    //random number generator function that passes the id parameter to ajax
    search_object.number_generate = function () {
        var rand = Math.floor(Math.random() *200);
        var id = movieIds[rand];
        return id;
    };

    //This function makes a request for one movie
    search_object.ajax_request = function (id) {

        $.ajax({
 
                // The URL for the request
            url: "https://www.omdbapi.com/?",
         
            // The data to send (will be converted to a query string)
            data: {
                i: id,
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
                //Response we run the request again until we get a valid response.
                //**Note** this code is actually from when the requests were truly random so it
                //no longer applies.
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
        var poster = data.Poster;
        $('.list-group').append("<li class='list-group-item'><div class='result'></div></li>");
        $('.list-group-item:last-child .result').append("<img src='" + poster + "' alt='Movie Poster'>");//adds movie poster
        $('.list-group-item:last-child .result').append("<div></div>");//adds div for text which is added in the next three lines
        $('.list-group-item:last-child .result div').append("<h1>" + title + "</h1>");
        $('.list-group-item:last-child .result div').append("<h2> " + year + " " + runtime + "</h2>");
        $('.list-group-item:last-child .result div').append("<p>Directed By: " + director + " Actors: " + actors + "</p>");
    }

    return search_object;
})();

$(document).ready(function () {
    Search.init();
});

var sports = ["Hunting", "Fishing", "Skateboarding", "Motorcross", "Basketball", "Hockey",
    "Baseball", "Football"];
function makeButtons() {
    $("#sportButtons").empty();
    for (var i = 0; i < sports.length; i++) {
        var b = $('<button>');
        b.addClass('sport');
        b.attr("data-name", sports[i]);
        b.text(sports[i]);
        $("#sportButtons").append(b);
    }
}

function getGifts() {
    var sport = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zDlJIQVcCE4NdUi4zpSjDe9LWtP0N2WH";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var sportDiv = $("#gifs-here").append('<div>');
                var ratingData = results[i].rating;
                var rating = $(sportDiv).append('<div>');
                $("#gifs-here").prepend(sportDiv);
                rating.append('<h5>Rating:' + ratingData + '</h5>');
                var image = $('<img>')
                rating.append(image);
                image.addClass('sportImage').attr('src', results[i].images.fixed_height_still.url).attr(
                    'data-state', 'still').attr('data-animate', results[i].images.fixed_height.url).attr(
                        'data-still', results[i].images.fixed_height_still.url);
            }
        });
}

$('#addSport').on('click', function (event) {
    event.preventDefault(event);
    var sportInput = $('#searchInput').val().trim();
    sports.push(sportInput);
    makeButtons();
})
makeButtons();
$(document).on('click', '.sport', getGifts);

$(document).on('click', '.sportImage', function () {
    var gifs = $(this).attr('data-state')
    if (gifs === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    } else if (gifs !== 'animate') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
});



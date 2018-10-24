require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./javascript/keys.js")
// var fs = require("fs");


// this for the movie api 
// var omdb = require('omdb');
// var movieName = process.argv[2];

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


function init() {
    switch (process.argv[2]) {
        case "spotify-this":
            spotify(process.argv.slice(3).join(" "));
            break;
        case "movies-this":
            movie(process.argv[3]);
            break;
        case "band-this":
            band(process.argv[3]);
            break;
        case "do-what-i-say":
            doIt();
            break;
        default:
            console.log("not today sucka!!")
    }
}

function spotify(song) {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
    });

    spotify.search({
        type: 'track',
        query: song,
        release_date: " ",
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
        console.log(data.tracks.items[0].album.artists[0].name)
        console.log(data.tracks.items[0].album.name)
    });

};

// function movie() {

//     omdb.search('saw', function(err, movies) {
//         if(err) {
//             return console.error(err);
//         }

//         if(movies.length < 1) {
//             return console.log('No movies were found!');
//         }

//         movies.forEach(function(movie) {
//             console.log('%s (%d)', movie.title, movie.year);
//         });

//         // Saw (2004)
//         // Saw II (2005)
//         // Saw III (2006)
//         // Saw IV (2007)
//         // ...
//     });


// }

init()
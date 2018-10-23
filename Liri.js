require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./javascript/keys.js")
var fs = require("fs");

var request = require("request");
var movieName = process.argv[2];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";




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
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
        console.log(data.tracks.items[0].album.artists[0].name)
        console.log(data.tracks.items[0].album.name)
    });

}

function movies() {

}

init()
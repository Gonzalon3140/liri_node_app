require("dotenv").config();
var request = require("request");

var omdb = require("omdb");

var Spotify = require("node-spotify-api");
var keys = require("./javascript/keys.js");
// var fs = require("fs");

// var bandList = require("./bands.js");

function init() {
  switch (process.argv[2]) {
    case "spotify-this-song":
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
      console.log("not today sucka!!");
  }
}

function spotify(song) {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify.search({
      type: "track",
      query: song,
      release_date: " "
    },
    function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }


      console.log(data.tracks.items[0]);
      console.log(data.tracks.items[0].album.name);
      console.log(data.tracks.items[0].album.release_date);
      console.log(data.tracks.items[0].album.artists[0].name);
      console.log(data.tracks.items[0].artists[0].external_urls.spotify);
    }
  );
}

function movie(m) {
  if (m == null || m == "") {
    m = "Mr. Nobody";
  }

  var Url = "http://www.omdbapi.com/?t=" + m + "&apikey=trilogy";

  var parsedBody;

  request(Url, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    parsedBody = JSON.parse(body);

    // console.log(parsedBody);
    console.log("Title: " + parsedBody.Title);
    console.log("Year: " + parsedBody.Year);
    console.log("Imdb: " + parsedBody.imdbRating);
    console.log("Rotten Tomatoes: " + parsedBody.Ratings[1].Value);
    console.log("Production Country: " + parsedBody.Country);
    console.log("Language of Movie: " + parsedBody.Language);
    console.log("Plot of the Movie: " + parsedBody.Plot);
    console.log("Actors of the Movie: " + parsedBody.Actors);
  });
}

function band(bandName) {

  if (bandName == null || bandName == "") {
    bandName = 'They Might Be giants';

  }

  // console.log("bn: " + bandName);

  var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

  var parsedBody;

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      parsedBody = JSON.parse(body);


      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log("Venue Name: " + parsedBody[0].venue.name);
      // console.log("Venue Location: " + parsedBody[0].venue.city);
      // console.log("Date of Event: " + parsedBody[0].datetime);
      console.log(bandName)
    }
  });
}

init();
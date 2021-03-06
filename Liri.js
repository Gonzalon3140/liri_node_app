require("dotenv").config();
var request = require("request");
var omdb = require("omdb");
var Spotify = require("node-spotify-api");
var keys = require("./javascript/keys.js");
var moment = require("moment");
var fs = require("fs");

function init() {
  switch (process.argv[2]) {
    case "spotify-this-song":
      spotify(process.argv.slice(3).join(" "));
      break;
    case "movies-this":
      movie(process.argv[3]);
      break;
    case "concert-this":
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
  if (song == null || song == "") {
    song = "The Sign";
  }
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify.search(
    {
      type: "track",
      query: song,
      release_date: " "
    },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      // console.log(data.tracks.items[0]);
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

  request(Url, function(error, response, body) {
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
    bandName = "";
  }
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    bandName +
    "/events?app_id=codingbootcamp";

  var parsedBody;

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      parsedBody = JSON.parse(body);

      // console.log(parsedBody);
      console.log("Venue Name: " + parsedBody[0].venue.name);
      console.log("Venue location: " + parsedBody[0].venue.country);
      console.log(
        "Date of the Event: " +
          moment(parsedBody[0].datetime).format("MM/DD/YYYY")
      );
    }
  });
}

//This will read a block of code from "random.txt" and run the fuction.
function doIt() {
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    // console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    //console.log(dataArr);
    spotify(dataArr[1]);
  });
}

init();

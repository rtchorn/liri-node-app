
var action = process.argv[2];

var value = process.argv[3];


switch(action){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        movie();
    break;

    case 'do-what-it-says':
        doit();
    break;

    default:
    break;
}


function twitter(){
  
  var twitterKeys = require('./keys.js').twitterKeys;
 
  var Twitter = require('twitter');
  
  var client = new Twitter ({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
  });
 
  var params = {screen_name: 'rtchorn'};
  

  
  client.get('statuses/user_timeline', params, function(error, tweets) {
   
    if (error) {
      console.log(error);
    }
    else {
      console.log("\n/////////////////TWEET ME////////////////\n");
      for(i=0; i< tweets.length; i++){
       console.log((i+1) + ". " + tweets[i].text);
      }
    }
  });
}


//SPOTIFY
function spotify() {
  var spotify = require('spotify');

  spotify.search({type: 'track', query: value || 'ace of base the sign'}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
   
    var spotifyCall = data.tracks.items[0];
   


    console.log("\n/////////////////SPOTIFY THIS////////////////\n");
    var artist = spotifyCall.artists[0].name;
    console.log("Artist: " + artist);
    var song = spotifyCall.name;
    console.log("Song name: " + song);
    var preview = spotifyCall.preview_url;
    console.log("Preview Link: " + preview);
    var album = spotifyCall.album.name;
    console.log("Album: " + album);

}
});
}

//OMDB 
function movie() {
  //npm package
var request = require('request');
var movieName = value;
var movieDefault = "Mr.Nobody";
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';


 if (movieName != null) {
    request(url, function (error, response, body) {
      
      if (!error && response.statusCode == 200) {
              console.log("\n/////////////////MOVIE THIS////////////////\n")
              console.log("Title: " + value);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };
      });
    
    } else {
      request(urlDefault, function (error, response, body) {
      
        if (!error && response.statusCode == 200) {
              console.log("Title: " + movieDefault);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };
      });
    } 
  } 


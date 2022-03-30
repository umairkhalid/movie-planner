var movieTitle = document.getElementById('title');

// API Keys
var PRIV_KEY = "40c84da05fc44a62c6d200140a0dde5d926a0fd7";
var PUBLIC_KEY = "426bf2ae38ca3c71453ed2839868d73a";

function getMarvelResponse() {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY);
  
  // the api deals a lot in ids rather than just the strings you want to use
  var characterId = '1009718'; // wolverine                                                                             


  var url = 'https://gateway.marvel.com:443/v1/public/characters/' + characterId + '?ts='+ ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

  console.log(url);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
    })
};

getMarvelResponse();
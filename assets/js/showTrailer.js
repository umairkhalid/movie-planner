/* 
showTrailer.js
This document contains the necessary elements to 
showTrailer(title, year)
eg: showTrailer('titanic','1997'), 	eg: showTrailer('Forrest Gump', '1994');
then var trailerURL is updated with the best trailer link

Copyright 2022 MOOVEE Team

Acceptance criteria:

GIVEN user wants to watch a YouTube Trailer about a movie
WHEN user clicks on a movie title
THEN a link to the best trailer is generated


*/

// global object trailerURL = link to URL of the trailer that best matches title, year
var trailerURL = [];

// search using YouTube Data API
function showTrailer(title, year) {
	// headers used to search 
	var request = gapi.client.youtube.search.list({
		part: 'snippet',
		q: title + ' ' + year + ' trailer',
		maxResults: 1,
	});
	// gapi's version of fetch
	request.execute(function (response) {
		// push the trailer url to global object trailerURL
		trailerURL.push(`https://www.youtube.com/embed/${response.result.items[0].id.videoId}`);

		// testing only
		
		// dummyRender(trailerURL[0]);
	});
}

// This loads the 'youtube' object into gapi.client
function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// This loads the 'apikey' object into gapi.client
function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyCsZSrt3l_PmnuJaVxt_FRuhBZULQhKN8Q');
}

// This renders the iframe with the trailer inside
function dummyRender() {
	// var bodyEl = document.querySelector('body');
	// var headingEl = document.createElement('h1');
	// headingEl.textContent = `dummyRender`;

	// grab the movie content area inside the modal
	var movieEl = document.querySelector('.modal-content');
	// clear the iframe child
	movieEl.innerHTML = '';

	// create an iframe and set its properties
	var iframeEl = document.createElement('iframe');
	iframeEl.setAttribute('width', movieEl.clientWidth);
	iframeEl.setAttribute('height', movieEl.clientHeight);
	console.log('The trailer url generated is ' + trailerURL[0]);
	iframeEl.setAttribute('src', trailerURL[0]);
	iframeEl.setAttribute('title', `YouTube video player`);
	iframeEl.setAttribute('frameborder', `0`);
	iframeEl.setAttribute('allow', `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`);
	iframeEl.setAttribute('allowfullscreen', '');

	// add the iframe to the movie content area
	movieEl.appendChild(iframeEl);
}

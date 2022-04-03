// function showTrailer

/* 
	USER STORY

	GIVEN user wants to watch a YouTube Trailer about a movie
	WHEN user clicks on a movie title
	THEN a link to the best trailer is generated

	USAGE

	when you call showTrailer(title, year), 	eg: showTrailer('titanic','1997'), 	eg: showTrailer('Forrest Gump', '1994');
	then var trailerURL is updated with the best trailer link

	TESTING

	dummyRender()

*/

// global object trailerURL = link to URL of the trailer that best matches title, year
var trailerURL = [];

// search using YouTube Data API
function showTrailer(title, year) {
	var request = gapi.client.youtube.search.list({
		part: 'snippet',
		q: title + ' ' + year + ' trailer',
		maxResults: 1,
	});
	request.execute(function (response) {
		trailerURL.push(`https://www.youtube.com/embed/${response.result.items[0].id.videoId}`);

		// testing only
		dummyRender(trailerURL[0]);
	});
}

// two configuration setttings for the YouTube Data API
function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyA-jBQgkd9GgT3Mo3GC0PgGG0fc3eXFr9Y');
}

//  testing only
function dummyRender(url) {
	var bodyEl = document.querySelector('body');
	var headingEl = document.createElement('h1')
	headingEl.textContent = `dummyRender`
	var iframeEl = document.createElement('iframe');
	iframeEl.setAttribute('width', bodyEl.clientWidth);
	iframeEl.setAttribute('height', bodyEl.clientHeight/2);
	iframeEl.setAttribute('src', url);
	iframeEl.setAttribute('title', `YouTube video player`);
	iframeEl.setAttribute('frameborder', `0`);
	iframeEl.setAttribute('allow', `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`);
	iframeEl.setAttribute('allowfullscreen', '');
	bodyEl.appendChild(headingEl)
	bodyEl.appendChild(iframeEl);
}

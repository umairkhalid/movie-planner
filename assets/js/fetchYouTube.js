/*
 * MOOVEE
 * fetchYouTube.js
 * This document contains the necessary elements to fetch a URL from YouTube Data API by searching with a title a year parameter
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// This loads the 'youtube' object into gapi.client
function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// This loads the 'apikey' object into gapi.client
function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyCsZSrt3l_PmnuJaVxt_FRuhBZULQhKN8Q');
}

// fetch data from YouTube Data API, and return a trailer url
fetchYouTube = async (title, year) =>
	new Promise((resolve, reject) => {
		// headers used to search
		var req = gapi.client.youtube.search.list({
			part: 'snippet',
			q: title + ' ' + year + ' trailer',
			maxResults: 1
		});
		// gapi's version of fetch
		req.execute(function (res) {
			resolve(`https://www.youtube.com/embed/${res.result.items[0].id.videoId}`);
		});
	});

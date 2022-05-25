/*
 * MOOVEE
 * renderYouTube.js
 * This script contains function renderYouTube, which generates an HTML5 iframe element containing the parameter trailerURL as its src
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// This renders the iframe with the trailer inside
function renderYouTube(trailerURL) {
	// grab the movie content area inside the modal
	var movieEl = document.querySelector('.modal-content');
	// clear the iframe child
	movieEl.innerHTML = '';

	// create an iframe and set its properties
	var iframeEl = document.createElement('iframe');
	iframeEl.setAttribute('width', movieEl.clientWidth);
	iframeEl.setAttribute('height', movieEl.clientHeight);
	iframeEl.setAttribute('src', trailerURL);
	iframeEl.setAttribute('title', `YouTube video player`);
	iframeEl.setAttribute('frameborder', `0`);
	iframeEl.setAttribute('allow', `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`);
	iframeEl.setAttribute('allowfullscreen', '');

	// add the iframe to the movie content area
	movieEl.appendChild(iframeEl);
}

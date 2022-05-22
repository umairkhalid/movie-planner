/*
 * MOOVEE
 * renderModal.js
 * This script uses Materialize to generate a modal, which will be used to contain a YouTube Trailer
 * It uses a Materialize button, as well as a Materialize loading animation
 * Copyright 2022 Moovee Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// load event listeners to the dropdown history button, and toggle the popup modal
$(document).ready(function () {
	// create an element with the class of 'modal'
	var elem = $('.modal');

	// Buttons: https://materializecss.com/buttons.html
	var savedSearches = $('.dropdown-trigger');
	savedSearches.dropdown();

	// Modal: https://materializecss.com/modals.html
	elem.modal();
	M.Modal.init(elem, {
		opacity: 0.9,
		inDuration: 500,
		outDuration: 500,
		onCloseEnd: clearTrailer
	});

	M.Dropdown.init(savedSearches, {
		inDuration: 500,
		coverTrigger: false
	});
});

// function to replace any rendered trailers with a loading animation
function clearTrailer() {
	var movieEl = document.querySelector('.modal-content');

	// add a Materialize loading animation
	movieEl.innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
}

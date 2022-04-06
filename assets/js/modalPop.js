/* 
modalPop.js
This document contains the necessary elements to load a trailer for a YouTube trailer and render it in an iframe
Copyright 2022 MOOVEE Team

 Acceptance criteria:
 GIVEN user wants to watch a Trailer for a movie, 
 WHEN user clicks on the Trailer button from the search page, 
 THEN an API call to YouTube will fetch the most relevant trailer and render it  to the page

 */
//var modalPopup = $(".trailerBtn");
// var dropThreeSearches = $(".dropdown-trigger");

// function to load event listeners to the dropdown history button, and also to toggle the popup modal
// both of these UI elements use the Materialize framework: 
// Buttons: https://materializecss.com/buttons.html
// Modal: https://materializecss.com/modals.html
$(document).ready(function () {

	var elem = $('.modal');
	var savedSearches = $('.dropdown-trigger');

	savedSearches.dropdown();
	elem.modal();

	M.Modal.init(elem, {
		opacity: 0.9,
		inDuration: 500,
		outDuration: 500,
		onCloseEnd: clearTrailer,
	});

	M.Dropdown.init(savedSearches, {
		inDuration: 500,
		coverTrigger: false,
	});
});

// function to clear the stack of trailers if not empty
function clearTrailer() {
	// clear trailer from metadata
	while (trailerURL.pop());
	// clear trailer from iframe
	var movieEl = document.querySelector('.modal-content');
	// clear the iframe from modal content area
	movieEl.innerHTML = '';
}
// function modalToggler() {
// 	var elem = $("#modal1");
// 	instance = M.Modal.getInstance(elem);
// 	instance.open();
// }

// function dropDownSearches(){
// 	var savedSearches = $("#dropdown1");
// 	var dropInstance = M.Dropdown.getInstance(savedSearches);
// 	dropInstance.open();
// }

//modalPopup.on("click", modalToggler);

// add event listeners to all buttons
// these buttons will grab the button's corresponding movie title and movie year, and then pass the arguments to YouTube to search for a trailer
function addListeners() {
	var allButtons = document.querySelectorAll('.btn.waves-effect.waves-light.modal-trigger');
	allButtons.forEach(function (trailerBtn) {
		trailerBtn.addEventListener('click', (event) => {
			// var details = event.target.parentElement.children[1];
			var title = event.target.parentElement.querySelector('.title').textContent;
			var year = event.target.parentElement.querySelector('.year').textContent.split('Year: ')[1];
			updateTrailerID(title, year);
		});
	});
}

// this function calls showTrailer to find a suitable trailer, and then waits until the trailer has been loaded, and then renders the iframe
function updateTrailerID(title, year) {
	// call YouTube Data API to generate a trailer
	showTrailer(title, year);

	// as it will take a while, check every 500ms to see if trailer has been pushed
	// (haven't learned async yet)
	var checkForTrailer = setInterval(() => {
		if (trailerURL.length !== 0) {
			clearInterval(checkForTrailer);
			// render the iframe with the trailer
			dummyRender();
		}
	}, 500);
}


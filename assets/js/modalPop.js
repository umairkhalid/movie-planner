//var modalPopup = $(".trailerBtn");
// var dropThreeSearches = $(".dropdown-trigger");

$(document).ready(function () {

	var elem = $('.modal');
	var savedSearches = $('.dropdown-trigger');

	savedSearches.dropdown();
	elem.modal();

	M.Modal.init(elem, {
		opacity: 0.9,
		inDuration: 500,
		outDuration: 500,
	});

	M.Dropdown.init(savedSearches, {
		inDuration: 500,
		coverTrigger: false,
	});
});

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
function addListeners() {
	var allButtons = document.querySelectorAll('.btn.waves-effect.waves-light.modal-trigger');
	allButtons.forEach(function (trailerBtn) {
		trailerBtn.addEventListener('click', (event) => {
			// var details = event.target.parentElement.children[1];
			var title = event.target.parentElement.querySelector('.title').textContent;
			var year = event.target.parentElement.querySelector('.year').textContent.split('Year: ')[1];
			console.log(`The event.target is event.target`, event.target);
			console.log(`The event.target.parentElement is`, event.target.parentElement);

			console.log(`The clicked title is ${title} and the clicked year is ${year}`);
			updateTrailerID(title, year);
			console.log('Now rendering function:');
		});
	});
}

// when button is clicked, get its title and year, update trailer, wait 2 seconds, then update YouTube-video-id
function updateTrailerID(title, year) {
	// call YouTube Data API to generate a trailer
	showTrailer(title, year);

	// as it will take a while, check every 500ms to see if trailer has been pushed
	var checkForTrailer = setInterval(() => {
		if (trailerURL.length !== 0) {
			clearInterval(checkForTrailer);
			dummyRender();
		}
	}, 500);
}


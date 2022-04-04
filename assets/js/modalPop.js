//var modalPopup = $(".trailerBtn");
// var dropThreeSearches = $(".dropdown-trigger");

$(document).ready(function () {
	var elem = $(".modal");
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
		coverTrigger: false
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

  

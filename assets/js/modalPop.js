var modalPopup = $(".trailerBtn");

$(document).ready(function () {
	var elem = $(".modal");

	elem.modal();

	var instances = M.Modal.init(elem, {
		opacity: 0.9,
		inDuration: 500,
		outDuration: 500,
		onOpenEnd: openFunc,
	});
});

function modalToggler() {
	var elem = $("#modal1");
	instance = M.Modal.getInstance(elem);
	instance.open();
}

function openFunc() {
	console.log("Hello World");
}

modalPopup.on("click", modalToggler);

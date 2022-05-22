/*
 * MOOVEE
 * renderHistory.js
 * This function renders recent searches from local storage to the history area
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// function to render recent searches. It is run this function when the history button is pressed
function renderHistory() {
	//
	// grab the container for the dropdown list of local history
	var historyEl = document.querySelector('#movieList');

	// grab the local history and parse it into an array
	var movieList = JSON.parse(localStorage.getItem('movieList')) || [];

	// delete all the children from the dropdown ul
	historyEl.innerHTML = '';

	// iterate through list of locally stored titles and render the recent search results from scratch
	for (var i = 0; i < movieList.length; i++) {
		//
		// destructure title from current movie
		var { title } = movieList[i];

		// create a new list item and set its text to the destructured title
		var listItem = document.createElement('li');
		listItem.textContent = title;

		// append the listItem
		historyEl.appendChild(listItem);
	}

	// add listeners to rendered list items so they will performSearch on click
	var listItems = document.querySelectorAll('#movieList li');

	// iterate through each liste item
	listItems.forEach((listItem) => {
		//
		// click events
		listItem.addEventListener('click', () => {
			//
			// set the text inside the search box to be the same as the clicked local history item
			inputEl.value = listItem.textContent;

			// run a search using this item
			performSearch();

			// focus the browser on the input element to keep the placeholder up
			inputEl.focus();
		});
	});
}

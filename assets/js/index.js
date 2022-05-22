/*
 * MOOVEE
 * index.js
 * This document contains the necessary elements to run Moovee
 * It searches OMDB for movies and renders them, and also render recent searches
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

const inputEl = document.getElementById('search-box');
const buttonEl = document.getElementById('search-button');
const historyButtonEl = document.getElementById('history-button');
const resultGridEl = document.getElementById('resultGrid');

// function to search for movies
async function performSearch() {
	//
	// add the current search to local storage
	setHistory(inputEl.value);

	// loading animation during OMDB wait
	resultGrid.innerHTML = '<div class="progress" style="width: 100vw"><div class="indeterminate"></div></div>';

	// search OMDB with the query from the search box
	const movies = await fetchOMDB(inputEl.value);

	// render the search results using the returned array of objects
	renderOMDB(movies);
}

// function to run on startup
function init() {
	// history button renders history
	historyButtonEl.addEventListener('click', function () {
		renderHistory();
	});

	// magnifying glass button triggers search
	buttonEl.addEventListener('click', (e) => {
		e.preventDefault();
		performSearch();
	});

	// typing enter triggers search
	inputEl.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			performSearch();
		}
	});
}
// run on startup
init();

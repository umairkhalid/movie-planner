/*
 * MOOVEE
 * setHistory.js
 * This function stores the string parameter movieName into local storage object {title: movieName} if it does not already exist in the local storage
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// function to add the current search to local storage
function setHistory(movieName) {
	//
	// get localStorage JSON object and parse it to an array
	const movieHistory = JSON.parse(localStorage.getItem('movieList')) || [];

	// check if the title already exists in local storage
	if (!movieHistory.find((movie) => movie.title === movieName)) {
		//
		// if not, then add the query to the list
		movieHistory.push({ title: movieName });
	}

	// push it back to localStorage
	localStorage.setItem('movieList', JSON.stringify(movieHistory));
}

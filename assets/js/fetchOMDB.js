/*
 * MOOVEE
 * fetchOMDB.js
 * This script contains fetchOMDB() which accepts a query string and makes calls to OMDB to return an array of objects containing metadata for each movie found
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// apikey for OMDB
const apikey = '630b3ac4';

// we are only interested in movies
const type = 'movie';

// function accepts a query string and makes calls to OMDB to return an array of objects containing metadata for each movie found
async function fetchOMDB(searchString) {
	//
	// variable to be returned
	const movieObjects = [];

	// first fetch — OMDB Search API
	const req1 = `https://www.omdbapi.com/?apikey=${apikey}&type=${type}&s=${searchString}&page=1`;

	// wait for OMDB response
	const res1 = await fetch(req1);

	// convert response to JSON, then destructure Search object
	const { Search } = await res1.json();

	// if nothing is returned, then return an empty array
	if (!Search) return movieObjects;

	// iterate through each movie
	for (let i = 0; i < Search.length; i++) {
		//
		// destructure the ID from current movie
		const { imdbID } = Search[i];

		// second fetch — OMDB IMDB API
		const req2 = `https://www.omdbapi.com/?apikey=${apikey}&type=${type}&i=${imdbID}`;

		// wait for OMDB response
		const res2 = await fetch(req2);

		// convert response to JSON, then destructure metadata
		const { Poster, Title, Year, Rated, Genre, Actors, Plot, Ratings } = await res2.json();

		// push a new object to movieObjects array
		movieObjects.push({
			poster: Poster,
			title: Title,
			esrb: Rated,
			year: Year,
			genre: Genre,
			actors: Actors,
			plot: Plot,
			rating: Ratings
		});
	}
	// return an array of all the movieObjects
	return movieObjects;
}

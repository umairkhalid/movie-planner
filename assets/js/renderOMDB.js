/*
 * MOOVEE
 * renderOMDB.js
 * This script contains function renderOMDB, which takes an array of movie objects and renders them to the history area
 * Copyright 2022 MOOVEE Team — Umair Khalid, Leo Wong, Elsie May, Xuan Huy Bui
 */

// handle for container to hold results
const resultGrid = document.getElementById('resultGrid');

// helper function to create document elements
const make = (elementName, className) => {
	const element = document.createElement(elementName);
	element.classList.add(className);
	return element;
};

// function to deserialize movieObjects and render them to the page
async function renderOMDB(movieObjects) {
	//
	// clear the result grid before rendering
	resultGrid.innerHTML = '';

	// base case
	if (!movieObjects.length) {
		const resultContainer = make('div', 'result-container');
		resultContainer.innerText = 'No movies found 🤔';
		resultGrid.appendChild(resultContainer);
		return;
	}

	movieObjects.forEach(async (movie) => {
		// deserialize metadata from each movie object
		const { poster, title, year, esrb, genre, actors, plot, rating } = movie;

		// container for everything for this movie
		const resultContainer = make('div', 'result-container');

		// add poster
		const moviePosterContainer = make('div', 'moviePoster');
		const moviePoster = make('img', 'movie-poster');
		moviePoster.setAttribute('src', poster === 'N/A' ? 'assets/images/noposter.png' : poster);
		moviePosterContainer.appendChild(moviePoster);
		resultContainer.appendChild(moviePosterContainer);

		// container for other details
		const movieDetailsContainer = make('div', 'movie-details');

		// Detail 1
		const movieTitle = make('h3', 'title');
		movieTitle.innerText = title === 'undefined' ? 'Moo! Try again' : title;
		movieDetailsContainer.appendChild(movieTitle);

		// Detail 2
		const movieULEl = make('ul', 'movieUL');

		const esrbEl = make('li', 'esrb');
		esrbEl.innerHTML = '<b>Rated: </b>' + esrb === 'undefined' ? 'Moo! Try again' : esrb;
		movieULEl.appendChild(esrbEl);

		const yearEl = make('li', 'year');
		yearEl.innerHTML = '<b>Year: </b>' + year === 'undefined' ? 'Moo! Try again' : year;
		movieULEl.appendChild(yearEl);

		const ratedEl = make('li', 'rated');
		ratedEl.innerHTML = '<b>Ratings: </b><br />';
		const sources = make('ul', 'sources');
		rating.forEach((r) => {
			const ratingEl = make('li', 'rating');
			ratingEl.innerHTML += `<b>${r.Source}: </b>${r.Value}<br />`;
			sources.appendChild(ratingEl);
		});
		ratedEl.appendChild(sources);
		movieULEl.appendChild(ratedEl);

		movieDetailsContainer.appendChild(movieULEl);

		// Detail 3
		const movieGenre = make('p', 'genre');
		movieGenre.innerHTML = '<b>Genre: </b>' + genre === 'undefined' ? 'Moo! Try again' : genre;
		movieDetailsContainer.appendChild(movieGenre);

		// Detail 4
		const movieActors = make('p', 'actors');
		movieActors.innerHTML = '<b>Actors: </b>' + actors === 'undefined' ? 'Moo! Try again' : actors;
		movieDetailsContainer.appendChild(movieActors);

		// Detail 5
		const moviePlot = make('p', 'plot');
		moviePlot.innerHTML = '<b>Plot: </b>' + plot === 'undefined' ? 'Moo! Try again' : plot;
		movieDetailsContainer.appendChild(moviePlot);

		// buttons listen for click to grab the title and year, and search YouTube for a trailer
		const trailerButton = make('button', 'btn');
		trailerButton.setAttribute('data-target', 'modal1');
		trailerButton.classList.add('waves-effect', 'waves-light', 'modal-trigger', 'red', 'darken-4');
		trailerButton.innerText = 'Trailer';
		trailerButton.addEventListener('click', async (event) => {
			var title = event.target.parentElement.querySelector('.title').textContent;
			var year = event.target.parentElement.querySelector('.year').textContent.split('Year: ')[1];

			// call fetchYouTube to find a suitable trailer
			const trailerURL = await fetchYouTube(title, year);

			// render the iframe
			renderYouTube(trailerURL);
		});

		// attach trailer button
		movieDetailsContainer.appendChild(trailerButton);

		// attach movie details
		resultContainer.appendChild(movieDetailsContainer);

		// attach result container
		resultGrid.appendChild(resultContainer);
	});
}

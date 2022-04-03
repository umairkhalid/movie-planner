// this document contains the necessary elements to
// GIVEN user wants to see 5 movie results
// WHEN they click Enter in the search box, or when they click the submit button
// THEN an API call to OMDB will fetch search results

const resultGrid = document.getElementById("resultGrid");
document.querySelectorAll("trailerBtn");

// user can search by either clicking the submit button (magnifying glass)
var buttonEl = document.getElementById('searchBtn');
buttonEl.addEventListener('click', (e) => {
	e.preventDefault();
	performSearch();
});

// user can also search by typing enter button while inside the search field
var inputEl = document.getElementById('searchBox');
inputEl.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		performSearch();
	}
});

// function to search for movies
function performSearch() {
	updateQueryString();
	callOMDB();
}

// function to store query string in global object 'headers'
function updateQueryString() {
	headers.s = inputEl.value;
}
var headers = {
	apikey: '630b3ac4',
	type: 'movie',
	t: 'titanic',
};

var i;
const movieInfo = [];

var posters = [];
var titles = [];
var years = [];
var esrbs = [];
var genres = [];
var actors = [];
var plots = [];
var ratings = [];
function callOMDB() {
	fetch('http://www.omdbapi.com/?' + 'apikey=' + headers.apikey + '&type=' + headers.type + '&s=' + headers.s + '&page=1')
		.then(function (generalSearchResult) {
			return generalSearchResult.json();
		})

		.then(function (data1) {
			// console.log(data1);
			// for each movie search result
			for (i = 0; i < data1.Search.length; i++) {
				// push the general metadata
				posters.push(data1.Search[i].Poster);
				titles.push(data1.Search[i].Title);
				years.push(data1.Search[i].Year);

				fetch('http://www.omdbapi.com/?' + 'apikey=' + headers.apikey + '&type=' + headers.type + '&i=' + data1.Search[i].imdbID)
					.then(function (specificSearchResult) {
						return specificSearchResult.json();
					})
					.then((data2) => {
						// push the specific metadata
						var rottenTomatoesRating = data2.Ratings.filter((movieRating) => movieRating.Source === 'Rotten Tomatoes');
						if (rottenTomatoesRating.length === 0) {
							ratings.push(data2.imdbRating + ' (imdb)');
						} else {
							ratings.push(rottenTomatoesRating[0].Value + ' (Rotten Tomatoes)');
						}
						esrbs.push(data2.Rated);
						genres.push(data2.Genre);
						actors.push(data2.Actors);
						plots.push(data2.Plot);

						// Testing
						// console.log(data2);
					});
			}
		})
		.then(setTimeout(renderFunction, 1000)); // I have allowed 1 second of thinking time for the computer
}

function renderFunction() {
	for (var i = 0; i < posters.length; i++) {
		// poster, title, year, esrb, genre, actors, plot, rating
		console.log(`Movie ${i}: Poster = ${posters[i]}, Title = ${titles[i]}, Year = ${years[i]}, ESRB = ${esrbs[i]}, Genre = ${genres[i]}, Actor = ${actors[i]}, Plot = ${plots[i]}, Rating = ${ratings[i]}`);
	}
	// // example render function
	// var ul = document.createElement("ul");
	// for (var i = 0; i < movieInfo.length; i++) {
	// 	var li = document.createElement("li");
	// 	li.innerHTML = `<span class="movieResultTitle">${movieInfo[i].title}</span><span class="movieResultYear">(${movieInfo[i].year})</span><img class="movieResultPoster" src="${movieInfo[i].poster}">`;
	// 	ul.appendChild(li);
	// }
	// var bodyEl = document.querySelector("body");
	// bodyEl.appendChild(ul);
	for (var i = 0; i < movieInfo.length; i++) {
		resultGrid.innerHTML = `
					<div class="moviePoster">
					<img src = ${movieInfo[i].poster}></div>
					<div class="movieDetails">
						<h3 class="title">${movieInfo[i].title}</h3>
					<ul class="movieUL">
						<li class="movieInfo"></li>
						<li class="year">Year: ${movieInfo[i].year}</li>
						<li class="rated">Rating: ${movieInfo[i].Rated}</li>
					</ul>
						<p class="genre">Genre:</b>${movieInfo[i].Type}</p>
						<p class="actors">Actors:</b>${movieInfo[i].Actors}</p>
						<p class="plot">Plot:</b>${movieInfo[i].Plot}</p>
					</div>
					<a class="waves-effect waves-light btn">Trailer</a>`;
			}
		});

	//Renders movie results//

	function clearMovieInfo() {
		while (movieInfo.length > 0) {
			movieInfo.pop();
		}

	}
}

/* 
getMovieInfo.js
This document contains the necessary elements to search for movies on OMDB and render them, and also render recent searches
Copyright 2022 MOOVEE Team

 Acceptance criteria:
 GIVEN user wants to see 5 movie results, 
 WHEN they click Enter in the search box, 
 or WHEN they click the submit button,
 THEN an API call to OMDB will fetch search results and render them to the page

 GIVEN user wants to see a history of search results,
 WHEN they click the Recent Searches button,
 THEN a list of recent searches will be available
 WHEN they click on a list item
 THEN the search bar will show the list item, and a search will be run automatically
 */
// handle for container to hold results 
const resultGrid = document.getElementById("resultGrid");

// handle for search button
var recentSearchBtn = document.getElementById("searchButton")

// user can search by either clicking the submit button (magnifying glass)
var buttonEl = document.getElementById("searchBtn");
buttonEl.addEventListener("click", (e) => {
	e.preventDefault();
	performSearch();
});

// user can also search by typing enter button while inside the search field
var inputEl = document.getElementById("searchBox");
inputEl.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		performSearch();
	}
});

// function to search for movies
function performSearch() {
	// get localStorage JSON object and parse it to an array
	var movieHistory = JSON.parse(localStorage.getItem("movieList")) || [];

	// set localStorage for the value inside search box
	var movie = { title: inputEl.value };
	movieHistory.push(movie);

	localStorage.setItem("movieList", JSON.stringify(movieHistory));

	// render list from local storage to the page
	renderRecentSearches();

	// grab the value inside search box and update it to local variable
	updateQueryString();

	// search OMDB with the search box query, and also render it to the page
	callOMDB();
}

// function to run on startup
function init() {
	// render any local storage files to the dropdown menu
	renderRecentSearches();
}
// run on startup
init();

// function to render recent searches. Run this function when button is pressed, and also on startup.
// this function will get list from local storage, delete all the children from the dropdown ul, and render the recent search results from scratch;
function renderRecentSearches() {

	// grab the container for the dropdown list of local history
	var movieSearch = document.querySelector('#movieList');
	// grab the local history and parse it into an array
	var movieList = JSON.parse(localStorage.getItem('movieList')) || [];

	// delete all the children from the dropdown ul
	movieSearch.innerHTML = '';
	// loop through list of locally stored titles and render the recent search results from scratch

	for (var i = 0; i < movieList.length; i++) {
		var movieName = movieList[i].title;

		var li = document.createElement('li');
		li.textContent = movieName;

		movieSearch.appendChild(li);
	}

	// add listeners to searches so they will performSearch on click
	var listItems = document.querySelectorAll("#movieList li");
	listItems.forEach((listItem) => {
		listItem.addEventListener("click", () => {
			inputEl.value = listItem.textContent;
			performSearch();
		});
	});
}

// add a listener on startup to render recent searches
recentSearchBtn.addEventListener("click",function(){
	renderRecentSearches();
});

// function to store query string in global object 'headers'
function updateQueryString() {
	headers.s = inputEl.value;
}
var headers = {
	apikey: "630b3ac4",
	type: "movie",
	t: "titanic",
};

var i;

var posters = [];
var titles = [];
var years = [];
var esrbs = [];
var genres = [];
var actors = [];
var plots = [];
var ratings = [];
var imdb1 = []; // hash for first fetch
var imdb2 = []; // hash for second fetch
// function that calls OMDB to get metadata of a movie, given a query string
// function also delegates a render function for the metadata
function callOMDB() {
	// clear metadata stack
	clearMovieInfo();

	fetch("https://www.omdbapi.com/?" + "apikey=" + headers.apikey + "&type=" + headers.type + "&s=" + headers.s + "&page=1")
		.then(function (generalSearchResult) {
			return generalSearchResult.json();
		})

		.then(function (data1) {
			// for each movie search result
			for (i = 0; i < data1.Search.length; i++) {
				// hash of order that we want the results to appear in
				imdb1.push(data1.Search[i].imdbID);

				fetch("https://www.omdbapi.com/?" + "apikey=" + headers.apikey + "&type=" + headers.type + "&i=" + data1.Search[i].imdbID)
					.then(function (specificSearchResult) {
						return specificSearchResult.json();
					})
					.then((data2) => {
						// push the general metadata
						if (data2.Poster === "N/A") {
							posters.push('/assets/js/images/noposter.png')
						} else {
							posters.push(data2.Poster);
						}
						titles.push(data2.Title);
						years.push(data2.Year);
						// push the specific metadata
						var rottenTomatoesRating = data2.Ratings.filter((movieRating) => movieRating.Source === "Rotten Tomatoes");
						if (rottenTomatoesRating.length === 0) {
							ratings.push(data2.imdbRating + " (imdb)");
						} else {
							ratings.push(rottenTomatoesRating[0].Value + " (Rotten Tomatoes)");
						}
						esrbs.push(data2.Rated);
						genres.push(data2.Genre);
						actors.push(data2.Actors);
						plots.push(data2.Plot);
						// hash of order that has been synchronously returned. Need to sort the data back to imdb1
						imdb2.push(data2.imdbID);
					});
			}
		})
		.then(() => {
			setTimeout(sortMetadata, 2000);
			setTimeout(renderFunction, 2000);
			setTimeout(addListeners, 2000);
			// setTimeout(dummyRender, 2000);
		}); // I have allowed 1 second of thinking time for the computer
}
// function to sort metadata
function sortMetadata() {
	// bubble sort
	for (var i = 0; i < imdb1.length; i++) {
		var j = imdb2.indexOf(imdb1[i]);
		if (i != j) {
			swap(imdb2, i, j);
			swap(posters, i, j);
			swap(titles, i, j);
			swap(years, i, j);
			swap(esrbs, i, j);
			swap(genres, i, j);
			swap(actors, i, j);
			swap(plots, i, j);
			swap(ratings, i, j);
		}
	}
}
// swap for bubble sort
function swap(arr, i, j) {
	temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

// function to render the metadata to the page
function renderFunction() {
	// clear the result container before rendering
	resultGrid.innerHTML = "";
	// loop through the length of the movies returned from OMDB search
	for (var i = 0; i < posters.length; i++) {
		resultGrid.innerHTML += `
					<div class= "resultContainer">
					<div class="moviePoster">
					<img src = ${posters[i]}></div>
					<div class="movieDetails">
						<h3 class="title">${titles[i]}</h3>
					<ul class="movieUL">
						<li class="movieInfo"></li>
						<li class="year"><b>Year: </b>${years[i]}</li>
						<li class="rated"><b>Rating: </b>${ratings[i]}</li>
					</ul>
						<p class="genre"><b>Genre: </b>${genres[i]}</p>
						<p class="actors"><b>Actors: </b>${actors[i]}</p>
						<p class="plot"><b>Plot: </b>${plots[i]}</p>					
						<button data-target="modal1" class="btn waves-effect waves-light modal-trigger red darken-4">Trailer</button>
					</div>

					</div>`;
	}
}

// Clear metadata stack
function clearMovieInfo() {
	posters.length = 0;
	titles.length = 0;
	years.length = 0;
	ratings.length = 0;
	esrbs.length = 0;
	genres.length = 0;
	actors.length = 0;
	plots.length = 0;
	imdb1.length = 0;
	imdb2.length = 0;
}

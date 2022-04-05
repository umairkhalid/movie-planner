// this document contains the necessary elements to
// GIVEN user wants to see 5 movie results
// WHEN they click Enter in the search box, or when they click the submit button
// THEN an API call to OMDB will fetch search results

const resultGrid = document.getElementById("resultGrid");

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
	// get localStorage
	var movieHistory = JSON.parse(localStorage.getItem("movieList")) || [];

	// set localStorage
	var movie = { title: inputEl.value };
	movieHistory.push(movie);

	localStorage.setItem("movieList", JSON.stringify(movieHistory));

	renderRecentSearches();

	updateQueryString();
	callOMDB();
}

function init() {
	renderRecentSearches(); // run on page load
}
init();

// TODO: a function to render recent searches. Run this function here, and also on startup.
// TODO: This function will get list from local storage, delete all the children from the dropdown ul, and render the recent search results from scratch;
function renderRecentSearches() {
	var movieHistory = JSON.parse(localStorage.getItem("movieList")) || [];
	console.log(movieHistory);
}

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
function callOMDB() {
	fetch("http://www.omdbapi.com/?" + "apikey=" + headers.apikey + "&type=" + headers.type + "&s=" + headers.s + "&page=1")
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

				fetch("http://www.omdbapi.com/?" + "apikey=" + headers.apikey + "&type=" + headers.type + "&i=" + data1.Search[i].imdbID)
					.then(function (specificSearchResult) {
						return specificSearchResult.json();
					})
					.then((data2) => {
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
					});
			}
		})
		.then(() => {
			console.log("Rendering function:");
			setTimeout(renderFunction, 2000);
			console.log("Adding button listeners:");
			setTimeout(addListeners, 2000);
			// console.log('Rendering video:');
			// setTimeout(dummyRender, 2000);
		}); // I have allowed 1 second of thinking time for the computer
}

function renderFunction() {
	resultGrid.innerHTML = "";
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
					</div>
					<button data-target="modal1" class="btn waves-effect waves-light modal-trigger red darken-4">Trailer</button>
					</div>`;
	}
}

//Renders movie results//
function clearMovieInfo() {
	while (posters.length > 0) {
		posters.pop();
	}
}

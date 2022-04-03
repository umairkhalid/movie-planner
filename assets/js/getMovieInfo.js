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
	updateQueryString();
	callOMDB();
}

// function to store query string in global object 'headers'
function updateQueryString() {
	headers.s = inputEl.value;
}
var headers = {
	apikey: "630b3ac4",
	type: "movie",
	s: "titanic",
};

const movieInfo = [];
function callOMDB() {
	fetch("http://www.omdbapi.com/?" + "apikey=" + headers.apikey + "&type=" + headers.type + "&s=" + headers.s + "&r=json&page=1")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			clearMovieInfo();
			for (var i = 0; i < data.Search.length; i++) {
				movieInfo.push({ title: data.Search[i].Title, type: data.Search[i].Type, year: data.Search[i].Year, imdbID: data.Search[i].imdbID, poster: data.Search[i].Poster });
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
					<img src = (${movieInfo[i].poster})></div>
					<div class="movieDetails">
						<h3 class="title">(${movieInfo[i].title})</h3>
					<ul class="movieUL">
						<li class="movieInfo"></li>
						<li class="year">Year: (${movieInfo[i].year})</li>
						<li class="rated">Rating: (${movieInfo[i].Rated})</li>
					</ul>
						<p class="genre">Genre:</b>(${movieInfo[i].Type})</p>
						<p class="actors">Actors:</b>(${movieInfo[i].Actors})</p>
						<p class="plot">Plot:</b>(${movieInfo[i].Plot})</p>
					</div>`;
			}
		});

	//Renders movie results//

	function clearMovieInfo() {
		while (movieInfo.length > 0) {
			movieInfo.pop();
		}
	}
}

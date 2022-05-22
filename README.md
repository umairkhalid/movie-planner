# MOOVEE V2

![OMDB](https://img.shields.io/badge/'17-0?label=OMDB%20API&style=for-the-badge&labelColor=white&color=black) ![YouTube Data Api](https://img.shields.io/badge/v3-0?label=YouTube%20Data%20API&style=for-the-badge&labelColor=white&color=black)

## Description

This app allows movie-watchers to select and watch movie trailers that they like.

I was part of the team that made the original app for our Coding Bootcamp Project 1. We used GitHub Projects [here](https://github.com/umairkhalid/movie-planner/projects/1) to coordinate the teamwork, tickets and issues.

While making the app, we made fetch calls to third-party APIs like `OMDB API` and `YouTube Data API`, learned about a framework called `Materialize` and used it to implement a modal, some buttons and a loading animation.

Disclosure that this repo, `Moovee V2`, is essentially what I fixed and refactored for best practice, based on the comments I received from the Bootcamp Grader, and is a fork of the [original](https://github.com/umairkhalid/movie-planner):

| My Changes | Details                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Fix        | I moved all images to the assets/images folder                          |
| Fix        | I renamed camelCase and snake_case `CSS` variables to kebab-case        |
| Fix        | I put a feedback message when no movie results are found                |
| Fix        | I sized the trailer correctly within the modal                          |
| Fix        | I moved the placeholder out of the way when a history result is clicked |
| Refactor   | I changed `.then` Promise syntax to `async await`                       |
| Refactor   | I modularized long multi-script files into one-script files             |
| Refactor   | I expanded on comments for completeness and accuracy                    |
| Refactor   | I removed some social media icons and simplified the remaining ones     |
| Feature    | I fixed the loading animation for the delay of results / trailer        |

## Table of Contents

-  [Usage](#usage)
-  [Screenshots](#screenshots)
-  [Documentation](#documentation)
-  [Credits](#credits)
-  [License](#license)

## Usage

MOOVEE V2 is deployed: [MOOVEE V2](https://leoelicos.github.io/bcs-07-moovee/). For the original, please see [MOOVEE](https://umairkhalid.github.io/movie-planner/).

## Screenshots

### Screenshot of MOOVEE V2 Landing Page
![MOOVEE V2 Landing Page](https://user-images.githubusercontent.com/99461390/169693289-90b3df7f-1817-4524-bc19-68e761230986.jpg)

### Screenshot of MOOVEE V2 Search Result
![MOOVEE V2 Search Result](https://user-images.githubusercontent.com/99461390/169693393-d21ea44d-d5d3-42f2-a08b-74840135e199.jpg)

### Screenshot of MOOVEE V2 Recent Searches
![MOOVEE Recent Searches](https://user-images.githubusercontent.com/99461390/169693965-bcfc6e6b-c12b-42bd-8450-46cbc0ffec04.jpg)

### Screenshot of MOOVEE V2 Trailer
![MOOVEE V2 Trailer](https://user-images.githubusercontent.com/99461390/169693361-63557cab-69e3-4b0d-a266-af6726905178.jpg)

## Documentation

-  API

   -  [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list)
   -  [The Open Movie Database API](https://www.omdbapi.com/)
   -  [Iframe Player parameters](https://developers.google.com/youtube/player_parameters)

-  Materialize

   -  CSS Framework
      -  [Color](https://materializecss.com/color.html)
      -  [Buttons](https://materializecss.com/buttons.html)
      -  [Text Inputs](https://materializecss.com/text-inputs.html)
      -  [Preload](https://materializecss.com/preloader.html)
   -  JS Framework
      -  [Modal](https://materializecss.com/modals.html)
      -  [Dropdown](https://materializecss.com/dropdown.html)

-  Fonts
   -  [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif)

## Credits

| Contributors                             | Roles                       | Tasks                    |
| ---------------------------------------- | --------------------------- | ------------------------ |
| Umair Khalid tyfoniacrage.x.au@gmail.com | Project Manager / Developer | Rendering, Design        |
| Elsie Lawrie elsiemaylawrie1@gmail.com   | Developer                   | Rendering, Design        |
| Xuan Huy Bui huybuixuan87@gmail.com      | Developer                   | Rendering, Local Storage |
| Leo Wong leoelicos@gmail.com             | Developer                   | APIs                     |

-  API Guides
   -  [YouTube Video: OMDB API Project](https://www.youtube.com/watch?v=0PNYQFaht8c)
   -  [YouTube Video: OMDB API Movie Search App](https://www.youtube.com/watch?v=1VjdxCTBfUI)
   -  [Atlassian Tutorial on Git Checkout](https://www.atlassian.com/git/tutorials/using-branches/git-checkout)
-  [Working in Branches](https://thenewstack.io/dont-mess-with-the-master-working-with-branches-in-git-and-github/)

## License

Licensed under the [MIT License](./LICENSE).

---

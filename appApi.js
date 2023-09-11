$(document).ready(function () {
   $('.search-form').on("submit", function (e) {
      e.preventDefault();
      // console.log($("#serch-form-input").val());
      let searchText = $("#serch-form-input").val();
      getMovies(searchText);
   });
});

function getMovies(searchText) {
   console.log(searchText);
   axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=915ac0d5')
      .then((response) => {
         // console.log(response);
         let movies = response.data.Search;
         console.log(movies);
         let output = '';
         $.each(movies, function (index, movie) {
            output += `
               <div class="col-lg-3 m-3">
                  <img src="${movie.Poster}">
                  <h4 class="p-2">${movie.Title}</h4>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Detailed information about: ${movie.Title}</a>
               </div>
            `;
            $('#movies').html(output);
         });
      })
      .catch((err) => {
         console.log(err);
      });
};
function movieSelected(id) {
   sessionStorage.setItem('movieID', id);
   window.location = 'movieSelected.html';
   return false;
}

function getMovie() {
   let movieID = sessionStorage.getItem('movieID');
   axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=915ac0d5')
      .then((response) => {
         console.log(response);
         let movie = response.data;
         let output = `
            <div class="row">
               <div class="col-md-4">
                  <img src="${movie.Poster}" class="img-thumbnail">
               </div>
               <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                     <a href="https://www.imdb.com/title/${movie.imdbID}" class="btn button1 text-white"><i class="bi bi-play-fill"></i>Watch</a>
                     <button class="button2 text-white"><i class="bi bi-download"></i>Download</button>

                     <div class="well">
                        <h2>Storyline</h2>
                        <p>${movie.Plot}</p>
                     </div>
                  <ul class="list-group">
                     <li class="list-group-item"><strong>Rating:</strong> ${'8.8'}</li>
                     <li class="list-group-item"><strong>Release year:</strong> ${'----'}</li>
                     <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                     <li class="list-group-item"><strong>Countries:</strong> ${'----'}</li>
                     <li class="list-group-item"><strong>Duration:</strong> ${movie.Runtime}</li>
                  </ul>
                  <hr>
                  <br>
                  <button class="button-messenger"><i class="bi bi-twitter"></i>+1</button>
                  <button class="button-messenger"><i class="bi bi-facebook"></i>1.6k</button>
               </div>
            </div>

            <div class="row my-1">
               <a href="https://www.imdb.com/title/${movie.imdbID}" class="btn btn-primary">Show Film <strong>${movie.Title}</strong> на IMDb.com</a>
               <a href="index.html" class="btn btn-primary my-1">Return to search</a>
            </div>
         `;
         $('#movie').html(output);
      })
      .catch((err) => {
         console.log(err);
      });
};
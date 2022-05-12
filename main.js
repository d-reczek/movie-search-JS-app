function init() {
  const form = document.querySelector(".search-movie");
  const titleSpan = document.querySelector(".title");
  const imdbRateSpan = document.querySelector(".imdb-rate");
  const rtRateSpan = document.querySelector(".rt-rate");
  const mcRateSpan = document.querySelector(".mc-rate");
  const relaseDateSpan = document.querySelector(".relase");
  const posterImg = document.getElementById("poster");
  const imdbLink = document.getElementById("imdb-link");
  const noMovieDiv = document.querySelector(".no-movie");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const inputTitle = document.querySelector(".movie-title").value;
    const inputYear = document.querySelector(".movie-year").value;
    async function searchMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?t=${inputTitle}&y=${inputYear}&apikey=a8fcf47b`
        );
        const data = await res.json();
        console.log(data);
        const rating = data.Ratings;
        let rottenRate = "";
        const RT = () => {
          rating.forEach(element => {
            if (element.Source === "Rotten Tomatoes") {
              return (rottenRate = element.Value);
            }
          });
        };
        RT();
        let mCRate = "";
        const MC = () => {
          rating.forEach(element => {
            if (element.Source === "Metacritic") {
              return (mCRate = element.Value);
            }
          });
        };
        MC();

        const title = data.Title;
        const year = data.Year;
        const imdbRateValue = data.imdbRating;
        const poster = data.Poster;
        const imdbID = data.imdbID;
        console.log(imdbID);
        titleSpan.textContent = title;
        relaseDateSpan.textContent = year;
        imdbRateSpan.textContent = imdbRateValue;
        rtRateSpan.textContent = rottenRate;
        mcRateSpan.textContent = mCRate;
        posterImg.src = poster;
        imdbLink.href = `https://www.imdb.com/title/${imdbID}/`;
        console.log(imdbLink.href);
        posterImg.style.display = "block";
        noMovieDiv.style.display = "none";
        imdbLink;
        return data;
      } catch (error) {
        console.error(error);
        posterImg.style.display = "none";
        noMovieDiv.style.display = "block";
      }
    }
    searchMovies();
    form.reset();
  });
}
window.onload = init;

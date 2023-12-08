'use server'

//discovery endpoint
export async function fetchMovies(page = 1, sortKey = 'popularity.desc', selectedGenres) {
  const genreIds = Array.isArray(selectedGenres) ? selectedGenres.join(',') : '';
  
  // const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`);
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortKey}&with_genres=${genreIds}&api_key=${process.env.API_KEY}`);
  // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=2e4417365ab633a384f99b850985cfdd
  //  https://api.themoviedb.org/3/movie/popular?sort_by=vote_average.desc&page=1&api_key=2e4417365ab633a384f99b850985cfdd
  const data = await response.json();
  console.log("Page:",data.page);
  console.log(data);
  return data.results; // Assuming the API response has a 'results' property
}

//api endpoint for popular movies endpoint
// export async function fetchMovies(page = 1) {
//   // const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`);
//   const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&api_key=${process.env.API_KEY}`);
//   // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=2e4417365ab633a384f99b850985cfdd
//   //  https://api.themoviedb.org/3/movie/popular?sort_by=vote_average.desc&page=1&api_key=2e4417365ab633a384f99b850985cfdd
//   const data = await response.json();
//   console.log("Page:",data.page);
//   console.log(data);
//   return data.results; // Assuming the API response has a 'results' property
// }

export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`);
    const movieDetails = await response.json();

    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`);
    const creditsData = await creditsResponse.json();

    const movieWithCredits = {
      ...movieDetails,
      cast: creditsData.cast,
    };

    return movieWithCredits;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

export async function fetchGenres() {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${process.env.API_KEY}`);
  const data = await response.json();
  return data.genres;
}

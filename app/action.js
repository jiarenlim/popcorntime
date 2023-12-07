'use server'

export async function fetchMovies(page = 1) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`);
  const data = await response.json();
  console.log("Page:",data.page);
  console.log(data);
  return data.results; // Assuming the API response has a 'results' property
}

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
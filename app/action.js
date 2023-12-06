'use server'

export async function fetchMovies(page = 1) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`);
  const data = await response.json();
  return data.results; // Assuming the API response has a 'results' property
}
import type { Movie } from "../types/movie";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

interface TMDBSearchResponse {
  results: Movie[];
}

const getAuthHeader = () => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error(
      "VITE_TMDB_TOKEN is not defined. Set VITE_TMDB_TOKEN in your .env file."
    );
  }

  return { Authorization: `Bearer ${token}` };
};

const instanse = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    ...getAuthHeader(),
  },
});

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await instanse.get<TMDBSearchResponse>("/search/movie", {
    params: { query },
  });

  return data.results;
};

export default fetchMovies;
export { instanse };

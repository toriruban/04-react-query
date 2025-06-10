import axios from 'axios'
import { Movie } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesSearchResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
  }

export default async function fetchMovies(query: string, page: number): Promise<MoviesSearchResponse>{
    const response = await axios.get<MoviesSearchResponse>(`${ BASE_URL }/search/movie`, {
        params: { query, page },
        headers: { Authorization: `Bearer ${ API_TOKEN }` }
    })
 
    return response.data;
}
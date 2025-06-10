import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "../App/App.module.css"
import SearchBar from "../SearchBar/SearchBar"
import { Movie } from "../../types/movie";
import  fetchMovies from "../../services/movieService"
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
    const [ movies, setMovies ] = useState<Movie[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const openModal = (movie:Movie) => {
        setSelectedMovie(movie);
        document.body.style.overflow = "hidden";
    }

    const closeModal = () => {
        setSelectedMovie(null);
        document.body.style.overflow = ""; 
    }

    const handleSearch = async (query: string) => {
          setError(false);
          setMovies([]);
          setLoading(true);
    
          try {
             const data = await fetchMovies(query);
             setLoading(false);
             if(!data || data.length === 0){
             toast.error('No movies found for your request.')
             return;
            }
              setMovies(data);
            }  catch (error) { 
               setLoading(false); 
               setError(true);   
               toast.error('There was an error, please try again...')
         };
       };
         return(
                 <div className={css.container}>
                      <Toaster position="top-center"/>
                      <SearchBar onSubmit={ handleSearch } />
                      {loading ? (<Loader />)
                      : error ? (<ErrorMessage />)
                      :  (movies.length > 0 && (
                      <MovieGrid 
                         movies={movies}  
                         onSelect={ openModal } />
                       )
                     )}
                      {selectedMovie && (
                      <MovieModal movie={ selectedMovie } 
                                  onClose={ closeModal } />
      )}
                 </div>
             );
            }  
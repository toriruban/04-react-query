import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from "react-hot-toast";
import css from "../App/App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [ selectedMovie, setSelectedMovie ] = useState<Movie | null>(null);
  const [ query, setQuery ] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [ "movies", query, currentPage ],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const openModal = (movie:Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = "hidden";
}

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = ""; 
}

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  const handlePageChange = ({ selected }: { selected:number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className={ css.container }>
      <Toaster position="top-center" />
      <SearchBar onSubmit={ handleSearch } />
      { isLoading && <Loader /> }
      { isError && <ErrorMessage /> }

      { isSuccess && data && data.results.length > 0 && (
        <>
           <MovieGrid movies = { data.results } onSelect={ openModal } />
           {data.total_pages > 1 && (
           <ReactPaginate 
           pageCount={ data.total_pages }
           pageRangeDisplayed={ 5 }
           marginPagesDisplayed={ 1 }
           onPageChange={({ selected }) => setCurrentPage(selected + 1)}
           forcePage={ data.page - 1 }
           containerClassName={ css.pagination }
           activeClassName={ css.active }
           nextLabel="→"
           previousLabel="←"
           />
           )}      
        </>
      )}

      { selectedMovie && (
        <MovieModal movie={ selectedMovie } onClose={ closeModal } />
      )}

    </div>
  )
}
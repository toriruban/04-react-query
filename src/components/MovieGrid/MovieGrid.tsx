import { useState } from "react";
import css from "../MovieGrid/MovieGrid.module.css";
import { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void; 
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={ css.grid }>
      {movies.map((movie) => (
        <MovieCard key={ movie.id } movie={ movie } onSelect={onSelect} />
      ))}
    </ul>
  );
}

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  const [posterError, setPosterError] = useState(false);
  const hasValidPoster = Boolean(movie.poster_path) && !posterError;

  return (
    <li className={ css.item } onClick={() => onSelect(movie)}>
      <div className={ css.card }>
        <div className={ css.posterWrapper }>
          {hasValidPoster ? (
            <img
              className={ css.image }
              src={`https://image.tmdb.org/t/p/w500/${ movie.poster_path }`}
              alt={ movie.title }
              loading="lazy"
              onError={() => {
                setPosterError(true);
              }}
            />
          ) : (
            <div className={ css.fallbackPoster }>
              <p className={ css.fallbackText }>{ movie.title }</p>
            </div>
          )}
        </div>
        <h2 className={ css.title }>{ movie.title }</h2>
      </div>
    </li>
  );
}
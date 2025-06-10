import { useEffect, useState } from "react";
import css from "./MovieModal.module.css";
import { Movie } from "../../types/movie";
import { createPortal } from "react-dom";

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const hasValidBackdrop = Boolean(movie.backdrop_path) && !imgError;

  return createPortal(
    <div
      className={ css.backdrop }
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={ css.modal }>
        <button
          className={ css.closeButton }
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className={ css.imageWrapper }>
          {hasValidBackdrop ? (
            <img
              className={ css.image }
              src={`https://image.tmdb.org/t/p/original/${ movie.backdrop_path }`}
              alt={ movie.title } 
              onError={() => setImgError(true)}
            />
          ) : (
            <p className={ css.fallbackText }>{ movie.title }</p>
          )}
        </div>

        <div className={ css.content }>
          <h2>{ movie.title }</h2>
          <p>{ movie.overview }</p>
          <p>
            <strong>Release Date:</strong> { movie.release_date }
          </p>
          <p>
            <strong>Rating:</strong> { movie.vote_average }
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
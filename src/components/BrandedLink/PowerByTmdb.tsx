import css from '../SearchBar/SearchBar.module.css'

export default function PoweredByTmdb() {
    return (
      <a
        className={ css.link }
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by TMDB
      </a>
    );
  }
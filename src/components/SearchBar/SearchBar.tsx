import toast from 'react-hot-toast';
import css from '../SearchBar/SearchBar.module.css';
import PoweredByTmdb from '../BrandedLink/PowerByTmdb';

interface SearchBarProps {
    onSubmit:(query: string) => void;
}

export default function SearchBar({ onSubmit }:SearchBarProps) {
  const handleSubmit = (formData: FormData): void => {
    const value = formData.get('query')
    const query = typeof value === 'string' ? value.trim() : '';
    if(!query) {
        toast.error('Please enter your search query')
        return;
    }
    onSubmit(query);
  };
  

  return (
    <header className={ css.header }>
       <div className={css.container}>
    <PoweredByTmdb />
        <form className={ css.form } action={ handleSubmit }>
          <input
            className={ css.input }
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
            <button className={ css.button } type="submit">Search</button>
        </form>
       </div>
   </header>
 )}

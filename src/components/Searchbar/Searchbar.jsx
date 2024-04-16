import css from './index.module.css';

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <span className={css['button-label']}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;

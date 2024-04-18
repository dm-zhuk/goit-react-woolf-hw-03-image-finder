import css from './index.module.css';

const Searchbar = ({ onSearchSubmit }) => (
  <header className={css.searchbar}>
    <form className={css.form} onSubmit={onSearchSubmit}>
      <button type="submit" className={css.button}>
        <span className={css['button-label']}>Search</span>
      </button>

      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images/pictures/photos"
        name="query"
        required
      />
    </form>
  </header>
);

export default Searchbar;

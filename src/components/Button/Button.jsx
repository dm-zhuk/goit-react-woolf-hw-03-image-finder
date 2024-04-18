import css from './index.module.css';

const Button = ({ onClick }) => (
  <button className={css.button} onClick={onClick}>
    Load more
  </button>
);

export default Button;

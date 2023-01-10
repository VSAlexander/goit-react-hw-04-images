import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import searchSvgIcon from './icon.svg';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const fixedUpQuery = event.target.value.trim().toLowerCase();
    setQuery(fixedUpQuery);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
  };

  return (
    <header className={css.searchWrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <img src={searchSvgIcon} alt="search-icon" />
        </button>
        <input
          value={query}
          type="text"
          className={css.input}
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

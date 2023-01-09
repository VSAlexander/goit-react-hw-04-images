import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import searchSvgIcon from './icon.svg';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    const query = event.target.value.trim().toLowerCase();
    this.setState({ query });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.searchWrapper}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <img src={searchSvgIcon} alt="search-icon" />
          </button>
          <input
            value={query}
            type="text"
            className={css.input}
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

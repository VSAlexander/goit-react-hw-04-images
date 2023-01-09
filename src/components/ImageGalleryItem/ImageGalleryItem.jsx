import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
      })
    ),
    onClick: PropTypes.func,
  };
  render() {
    const { id, webformatURL, largeImageURL, onClick } = this.props;
    return (
      <li
        className={css.galleryItem}
        key={id}
        onClick={() => onClick(largeImageURL)}
      >
        <img src={webformatURL} alt="Smaller img" />
      </li>
    );
  }
}

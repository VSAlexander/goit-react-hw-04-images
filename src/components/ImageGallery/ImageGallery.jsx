import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
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
    const { images, onClick } = this.props;
    return (
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              id={id}
              onClick={onClick}
            />
          );
        })}
      </ul>
    );
  }
}

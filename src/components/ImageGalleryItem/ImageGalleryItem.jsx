import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {
  return (
    <li className={css.galleryItem} onClick={() => onClick(largeImageURL)}>
      <img src={webformatURL} alt="Smaller img" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

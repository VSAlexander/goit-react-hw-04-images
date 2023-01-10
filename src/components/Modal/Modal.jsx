import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ src, onClose }) {
  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyClose = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyClose);

    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  });

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={src} alt="Larger img" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
};

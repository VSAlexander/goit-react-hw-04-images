import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string,
    onClose: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { src } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleClose}>
        <div className={css.modal}>
          <img src={src} alt="Larger img" />
        </div>
      </div>
    );
  }
}

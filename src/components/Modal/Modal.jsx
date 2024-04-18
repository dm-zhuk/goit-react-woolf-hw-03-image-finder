import css from './index.module.css';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEvt);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEvt);
  }

  handleKeyEvt = ({ key }) => {
    key === 'Escape' && this.props.onCloseModal();
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  };

  handleLoadedImg = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.onBackdropClick}>
        <div className={css.modal}>
          <img
            src={this.props.largeImageURL}
            alt={this.props.tags}
            onLoad={this.handleLoadedImg}
            onError={this.handleLoadedImg}
          />
        </div>
      </div>
    );
  }
}

export default Modal;

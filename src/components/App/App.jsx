import React, { Component, createRef } from 'react';
import css from './index.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from 'components/App/services/api';
import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    modalImg: null,
    isLoading: false,
    onLoadMore: false,
  };

  galleryRef = createRef();

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  onSearchSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim().toLowerCase();
    this.setState({
      query: query,
      images: [],
      page: 1,
    });
  };

  loadImages = async () => {
    // launching spinner
    this.showLoader();
    try {
      const { hits, onLoadMore } = await fetchImages(
        this.state.query,
        this.state.page
      );

      if (hits.length === 0) {
        throw new Error('No images found. Please try a different query.');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        onLoadMore: onLoadMore,
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      // hiding unnecessary spinner
      this.hideLoader();
    }

    if (this.state.page > 1) {
      this.scrollDown();
    }
  };

  scrollDown = () => {
    const { clientHeight } = document.documentElement;

    window.scrollBy({
      top: clientHeight * 2,
      behavior: 'smooth',
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.loadImages();
    }

    if (!prevState.images.length && this.state.images.length) {
      this.scrollDown();
      setTimeout(() => this.hideLoader(), 250);
    }
  }
  //  open large image in modal window
  onImageClick = image => {
    this.setState({ modalImg: image });
  };

  //  close modal window
  onCloseModal = () => {
    this.setState({ modalImg: null });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSearchSubmit={this.onSearchSubmit} />
        <Loader isLoading={this.state.isLoading} />
        <ToastContainer />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
          galleryRef={this.galleryRef}
          //  galleryRef is passed as a prop to the ImageGallery component so that it can be used to reference the gallery element for scrolling
        />
        {this.state.onLoadMore && this.state.images.length > 0 && (
          <Button
            onClick={() =>
              this.setState(prevState => ({ page: prevState.page + 1 }))
            }
          />
        )}
        {this.state.modalImg && (
          <Modal {...this.state.modalImg} onCloseModal={this.onCloseModal} />
        )}
      </div>
    );
  }
}

export default App;

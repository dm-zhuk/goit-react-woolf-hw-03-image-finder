import axios from 'axios';

const KEY = '22046149-41a2515b5a783e6a5f4bfbfcc';
const perPage = 12;
const defaultParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: KEY,
        q: query,
        page: page,
        per_page: perPage,
        ...defaultParams,
      },
    });

    const hits = response.data.hits.map(
      ({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      })
    );

    return hits;
  } catch (error) {
    console.error('An error occurred while fetching images:', error);
    throw error;
  }
};

/*     const responseOnData = {
      hits: response.data.hits.map(
        ({ id, webformatURL, tags, largeImageURL }) => ({
          id,
          webformatURL,
          tags,
          largeImageURL,
        })
      ),
      isLoadMore: response.data.totalHits > page * 12,
    };

    return responseOnData;
  } catch (error) {
    console.error('An error occurred while fetching images:', error);
    throw error;
  }
}; */

//App///draft////////////////\\\\\\\\\\\\\\\\\\\\\\\\
import React, { Component } from 'react';
import css from './index.module.css';
// import { fetchImages } from 'components/App/services/api';
import { fetchImages } from 'components/App/services/api-copy';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isLoadMore: false,
    modalImage: null,
  };

  handleSearchSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.value;
    this.setState({ query, page: 1 });
  };

  onImageClick = image => {
    this.setState({ modalImage: image });
  };

  removeModalImage = () => {
    this.setState({ modalImage: null });
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query');

    if (query) {
      this.setState({ query }, this.fetchImages);
    }
  }

  async componentDidUpdate(_, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const images = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        images:
          this.state.page === 1 ? images : [...prevState.images, ...images],
      }));
    } catch (error) {
      console.error('An error occurred while fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <section className={css.App}>
        <Searchbar handleSearchSubmit={this.handleSearchSubmit} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
        />
        <Loader visible={this.state.isLoading} />
        {this.state.modalImage && (
          <Modal
            {...this.state.modalImage}
            removeModalImage={this.removeModalImage}
          />
        )}
        {this.state.isLoadMore && this.state.images && (
          <Button
            onClick={() =>
              this.setState(prevState => ({
                page: prevState.page + 1,
              }))
            }
            text="Load more"
          />
        )}
      </section>
    );
  }
}

export default App;
//api.js//draft////////////////////////\\\\\\\\\\\
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '22046149-41a2515b5a783e6a5f4bfbfcc';
const getApi = axios.create({
  baseURL: URL,
  params: {
    key: KEY,
  },
});

export const fetchImages = async (query, page) => {
  const response = await getApi.get('', {
    params: {
      q: query,
      image_type: 'photo',
      page: page,
      per_page: 12,
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  const responseOnData = {
    hits: response.data.hits.map(
      ({ id, webformatURL, tags, largeImageURL }) => ({
        id,
        webformatURL,
        tags,
        largeImageURL,
      })
    ),
    isLoadMore: response.data.totalHits > page * 12,
  };
  return responseOnData;
};

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '22046149-41a2515b5a783e6a5f4bfbfcc',
  per_page: perPage,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,

  async function fetchGallery(searchQuery) {
  try {
    const response = await axios.get('/', {
      params: {
        ...axios.defaults.params,
        q: searchQuery,
        page: page.value,
      },
    });
  };
  //api.js//original////////////////////////\\\\\\\\\\\
  const PIXABAY_API_URL = 'https://pixabay.com/api/';
  const API_KEY = '40188796-142b3a6aed6b1a3d407973769';
  const AXIOS_CLIENT = axios.create({
    baseURL: PIXABAY_API_URL,
    params: {
      key: API_KEY,
    },
  });

  export const searchImages = async (query, page) => {
    const response = await AXIOS_CLIENT.get('', {
      params: {
        q: query,
        image_type: 'photo',
        page: page,
        per_page: 12,
        orientation: 'horizontal',
      },
    });
    const return_data = {
      hits: response.data.hits.map(
        ({ id, webformatURL, tags, largeImageURL }) => ({
          id,
          webformatURL,
          tags,
          largeImageURL,
        })
      ),
      canLoadMore: response.data.totalHits > page * 12,
    };
    return return_data;
  };
  //Button.jsx//draft = original///////\\\\\\\\\\\
  const Button = ({ onClick, text }) => {
    return (
      <button className={css.button} onClick={onClick}>
        {text}
      </button>
    );
  };
  export default Button;

  /* // !!need to play on TEXT !! \\
  const Button = props => {
    return (
      <button className={css.button} {...props}>
      Load More
      </button>
    );
  };
  export default Button;
   */
  //ImageGallery.jsx//draft////////////////////////\\\\\\\\\\\
  const ImageGallery = ({ images, onImageClick }) => {
    return (
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            item={image}
            onImageClick={onImageClick}
          />
        ))}
      </ul>
    );
  };
  export default ImageGallery;
  //  //
  import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
  import { gallery } from './index.module.css';

  const ImageGallery = ({ images, onImageClick }) => (
    <ul className={gallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={`${image.id}-${index}`}
          item={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );

  export default ImageGallery;
  /* 
  import { forwardRef } from 'react';
  const ImageGallery = forwardRef((props, ref) => {
    return (
      <ul className={css.gallery} ref={ref}>
        {!!props.images.length &&
          props.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              handleImageClick={props.handleImageClick}
            />
          ))}
      </ul>
    );
  });
   */
  //ImageGalleryItem.jsx//draft////////////////////////\\\\\\\\\\\
  const ImageGalleryItem = ({ item, onImageClick }) => {
    return (
      <li
        className={css['gallery-item']}
        onClick={() => onImageClick(item.largeImageURL)}
      >
        <img
          className={css['gallery-image']}
          src={item.webformatURL}
          alt={item.tags}
        />
      </li>
    );
  };
  export default ImageGalleryItem;

  /* 
  const ImageGalleryItem = ({ item, handleImageClick }) => {
    return (
      <li
        className={css['gallery-item']}
        onClick={() => handleImageClick(item.largeImageURL)}
      >
        <img
          className={css['gallery-image']}
          src={item.webformatURL}
          alt={item.tags}
        />
      </li>
    );
  };
   */
  import { galleryItem, galleryImage } from './index.module.css';

  const ImageGalleryItem = ({ item, onImageClick }) => (
    <li className={galleryItem} onClick={() => onImageClick(item)}>
      <img className={galleryImage} src={item.webformatURL} alt={item.tags} />
    </li>
  );

  export default ImageGalleryItem;
  //Modal.jsx//draft////////////////////////\\\\\\\\\\\
  import { Component } from 'react';

  class Modal extends Component {
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.removeModalImage();
      }
    };

    handleBackdropClick = e => {
      if (e.currentTarget === e.target) {
        this.props.removeModalImage();
      }
    };

    render() {
      return (
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.modal}>
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </div>
        </div>
      );
    }
  }

  export default Modal;
  /* 
  import { Component, createRef } from 'react';
  export default class Modal extends Component {
    state = {
      isLoading: true,
    };
    overlayRef = createRef();
  
    componentDidMount = () =>
      window.addEventListener('keydown', this.handleKeyEvent);
  
    componentDidUpdate = (_, prevState) => {
      if (prevState.isLoading) this.props.handleLoader();
    };
  
    componentWillUnmount = () =>
      window.removeEventListener('keydown', this.handleKeyEvent);
  
    handleKeyEvent = ({ key }) =>
      key === 'Escape' && this.props.handleCloseModal();
  
    handleClose = ({ target }) =>
      target === this.overlayRef.current && this.props.handleCloseModal();
  
    handleImageLoaded = () => {
      this.setState({ isLoading: false });
    };
  
    render() {
      const { imageUrl, alt } = this.props;
      return (
        <div
          className={css.overlay}
          onClick={this.handleClose}
          ref={this.overlayRef}
        >
          <div className={css.modal}>
            <img
              src={imageUrl}
              alt={alt}
              onLoad={this.handleImageLoa 
                ded}
              onError={this.handleImageLoaded}
            />
          </div>
        </div>
      );
    }
  }
  
  ////////////////////
  import { useEffect, useCallback, useState } from 'react';
  
  const Modal = ({ largeImageURL, tags, onCloseModal }) => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const handleKeyEvt = ({ key }) => {
        if (key === 'Escape') {
          onCloseModal();
        }
      };
  
      window.addEventListener('keydown', handleKeyEvt);
  
      return () => {
        window.removeEventListener('keydown', handleKeyEvt);
      };
    }, [onCloseModal]);
  
    const handleLoadedImg = () => {
      setIsLoading(false);
    };
  
    const onClose = useCallback(
      evt => {
        if (evt.currentTarget === evt.target) {
          onCloseModal();
        }
      },
      [onCloseModal]
    );
  
    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          {isLoading ? (
            <div className={css.spinner}></div> // Render the spinner while loading
          ) : (
            <img
              src={largeImageURL}
              alt={tags}
              onLoad={handleLoadedImg}
              onError={handleLoadedImg}
            />
          )}
        </div>
      </div>
    );
  };
  ////////////////////
   */
  //Searchbar.jsx//draft////////////////////////\\\\\\\\\\\
  const SearchBar = ({ handleSearchSubmit }) => {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSearchSubmit}>
          <button type="submit" className={css.button}>
            <span className={css['button-label']}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            required
          />
        </form>
      </header>
    );
  };
  export default SearchBar;

  /* 
  const SearchBar = ({ onSubmit }) => {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={onSubmit}>
          <button type="submit" className={css.button}>
            <span className={css['button-label']}>Search</span>
          </button>
  
          <input
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  };
   */
  //r.jsx//draft////////////////////////\\\\\\\\\\\
  scrollDown = () => {
    setTimeout(() => {
      const { clientHeight } = this.galleryRef.current.firstElementChild;

      window.scrollBy({
        top: clientHeight * 2,
        behavior: 'smooth',
      });
    }, 0);
  };
  
  function loadMoreImages() {
    page.value += 1;
    searchImages();

    // Smooth scroll up two cards height
    scrollDown = () => {
      setTimeout(() => {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }, 0);
    }

    return {
      page > 1 && this.scrollDown();
  } catch (err) {
    console.error(err.message);
  } finally {
    setTimeout(() => this.setState({ isLoading: false }), 300);
  }
}

 componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (!query) return;

    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const imagesData = await fetchImages(query, page);

        this.setState(prev => {
          const updatedImages =
            page === 1 ? imagesData.hits : [...prev.images, ...imagesData.hits];

          return {
            ...prev,
            totalHits: imagesData.totalHits,
            images: updatedImages,
          };
        });

        page > 1 && this.scrollDown();
      } catch (err) {
        console.error(err.message);
      } finally {
        setTimeout(() => this.setState({ isLoading: false }), 300);
      }
    }
 };
  //////not used in mine/////////////////
 import { forwardRef } from 'react';

import css from './ImageGallery.module.css';

const ImageGallery = forwardRef((props, ref) => {
  return (
    <ul className={css.gallery} ref={ref}>
      {!!props.images.length &&
        props.images.map(image => <ImageGalleryItem key={image.id} item={image} handleImageClick={props.handleImageClick} />)}
    </ul>
  );
});
/////////////
import React, { Component, createRef } from 'react';
import css from './index.module.css';
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
    hasLoadMore: false,
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
      page: 1,
      images: [],
    });
  };

  async loadImages() {
    this.showLoader();
    try {
      const { hits, hasLoadMore } = await fetchImages(
        this.state.query,
        this.state.page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        hasLoadMore: hasLoadMore,
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      this.hideLoader();
    }

    if (this.state.page > 1) {
      this.scrollDown();
    }
  }

  scrollDown = () => {
    const { clientHeight } = document.documentElement;
    const { height: cardHeight } = this.galleryRef.current.firstElementChild.getBoundingClientRect();

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

  onImageClick = image => {
    this.setState({ modalImg: image });
  };

  onCloseModal = () => {
    this.setState({ modalImg: null });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSearchSubmit={this.onSearchSubmit} />
        <Loader isLoading={this.state.isLoading} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
          galleryRef={this.galleryRef}
        />
        {this.state.modalImg && (
          <Modal {...this.state.modalImg} onCloseModal={this.onCloseModal} />
        )}
        {this.state.hasLoadMore && this.state.images.length > 0 && (
          <Button
            onClick={() =>
              this.setState(prevState => ({ page: prevState.page + 1 }))
            }
          />
        )}
      </div>
    );
  }
}

export default App;

 scrollDown = () => {
    const { clientHeight } = document.documentElement;
    const { height: cardHeight } =
      this.galleryRef.current.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: (cardHeight + 12) * 2, // Adjust the scroll distance as needed
      behavior: 'smooth',
    });
 };
  ///////////////
  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
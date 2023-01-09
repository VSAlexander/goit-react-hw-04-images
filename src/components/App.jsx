import { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '16135792-2d496ba8b681987b91053eb75';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    visible_images: 12,
    srcLargeImg: '',
    isLoading: false,
    isModalOpen: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchData(query, page);
    } // realization loadMore

    if (prevState.query !== this.state.query) {
      this.setState({ page: 1, images: [] });
    }
  }

  fetchData = async (query, page = 1) => {
    this.setState({ isLoading: true });

    if (query === '') {
      this.setState({ isLoading: false });
      Notiflix.Notify.warning(
        'Too much results were found. Try to be more specific'
      );
      return;
    }

    try {
      const response = await axios.get(
        `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, no matches were found for your query');
        return;
      }

      const data = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...data],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmitInForm = query => {
    this.fetchData(query);

    this.setState({ query, page: 1, visible_images: 12, images: [] }); // derive this.state.query from Searchbar and put it into state of App Component
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      visible_images: prevState.visible_images + 12,
    }));
  };

  handleOpenModal = src => {
    this.setState({ srcLargeImg: src, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ srcLargeImg: '', isModalOpen: false });
  };

  render() {
    const { images, srcLargeImg, visible_images, isLoading, isModalOpen } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitInForm} />
        <ImageGallery images={images} onClick={this.handleOpenModal} />
        {isLoading && <Loader />}
        {images.length !== 0 &&
        !isLoading &&
        visible_images <= images.length ? (
          <Button onClick={this.handleLoadMore} />
        ) : null}
        {isModalOpen && (
          <Modal src={srcLargeImg} onClose={this.handleCloseModal} />
        )}
      </>
    );
  }
}

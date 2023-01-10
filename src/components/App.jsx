import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '16135792-2d496ba8b681987b91053eb75';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [visible_images, setVisible_images] = useState(12);
  const [srcLargeImg, setSrcLargeImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevPageRef = useRef(1);

  useEffect(() => {
    if (prevPageRef.current === page) {
      return;
    }
    fetchData(query, page);
  }, [page, query]);

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [query]);

  // componentDidUpdate(_, prevState) {
  //   const { query, page } = this.state;

  //   if (prevState.page !== this.state.page && this.state.page !== 1) {
  //     this.fetchData(query, page);
  //   } // realization loadMore ///

  //   if (prevState.query !== this.state.query) {
  //     this.setState({ page: 1, images: [] });
  //   }
  // }

  const fetchData = async (query, page = 1) => {
    setIsLoading(true);

    if (query === '') {
      setIsLoading(false);
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

      setImages(prevState => {
        return [...prevState, ...data];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitInForm = query => {
    fetchData(query);

    setQuery(query);
    setPage(1);
    setVisible_images(12);
    setImages([]);

    // this.setState({ query, page: 1, visible_images: 12, images: [] }); // derive this.state.query from Searchbar and put it into state of App Component
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setVisible_images(prevState => prevState + 12);
  };

  const handleOpenModal = src => {
    setSrcLargeImg(src);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSrcLargeImg('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmitInForm} />
      <ImageGallery images={images} onClick={handleOpenModal} />
      {isLoading && <Loader />}
      {images.length !== 0 && !isLoading && visible_images <= images.length ? (
        <Button onClick={handleLoadMore} />
      ) : null}
      {isModalOpen && <Modal src={srcLargeImg} onClose={handleCloseModal} />}
    </>
  );
}

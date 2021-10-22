import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import Modal from './components/Modal/Modal';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { getPictures } from './services/apiService';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [setOfImages, setSetOfImages] = useState([]);
  const [page, setPage] = useState(1);
  const [bigImg, setBigImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  const handleSearchbarSubmit = query => {
    setQuery(query);
    setStatus('pending');
    setPage(1);
    getPictures(query, 1)
      .then(arr => {
        if (arr.length < 1) {
          return toast.error('Nothing was found.');
        }
        setSetOfImages(arr);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // .finally(() => Loading(false));
  };

  const resetState = () => {
    setSetOfImages([]);
    setPage(1);
    setError(null);
  };

  const onLoadMore = () => {
    getPictures(query, page + 1).then(img => {
      setSetOfImages(prevState => [...prevState, ...img]);
      setPage(page + 1);
      setStatus('resolved');
    });
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setBigImg(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar
        query={query}
        onSubmit={handleSearchbarSubmit}
        resetState={resetState}
      />

      <ImageGallery images={setOfImages} page={page} onOpen={openModal} />

      {status === 'pending' && <Loader />}

      {setOfImages.length > 0 && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal
          onClose={closeModal}
          // onClose={this.toggleModal}
          src={bigImg}
          alt={query}
        />
      )}
      <ToastContainer autoClose={2000} />
      {status === 'rejected' && <ErrorMessage message={error} />}
    </div>
  );
}

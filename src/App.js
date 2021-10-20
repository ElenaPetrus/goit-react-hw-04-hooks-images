import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { getPictures } from './services/apiService';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    setOfImages: [],
    page: 1,
    bigImg: null,
    showModal: false,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({ query, status: 'pending', page: 1 });
    getPictures(query, 1)
      .then(arr => this.setState({ setOfImages: arr }))
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  };

  resetState = () => {
    this.setState({
      setOfImages: [],
      page: 1,
      error: null,
    });
  };

  onLoadMore = () => {
    const { query, page } = this.state;
    getPictures(query, page + 1).then(img =>
      this.setState(prevState => ({
        setOfImages: [...prevState.setOfImages, ...img],
        page: prevState.page + 1,
        status: 'resolved',
      })),
    );
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      bigImg: largeImageURL,
    });
  };

  closeModal = () => this.setState({ showModal: false });

  // toggleModal = largeImageURL => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  //   this.setState({ bigImg: largeImageURL });
  // };

  render() {
    return (
      <div>
        <Searchbar
          query={this.state.query}
          onSubmit={this.handleSearchbarSubmit}
          resetState={this.resetState}
        />

        <ImageGallery
          images={this.state.setOfImages}
          page={this.state.page}
          onOpen={this.openModal}
          // onOpen={this.toggleModal}
        />

        {this.state.status === 'pending' && <Loader />}

        {this.state.setOfImages.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.closeModal}
            // onClose={this.toggleModal}
            src={this.state.bigImg}
            alt={this.state.query}
          />
        )}
        <ToastContainer autoClose={2000} />
        {this.state.status === 'rejected' && (
          <ErrorMessage message={this.state.error} />
        )}
      </div>
    );
  }
}

export default App;

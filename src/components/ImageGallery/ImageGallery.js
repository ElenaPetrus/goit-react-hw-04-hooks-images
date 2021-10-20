import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onOpen }) {
  return (
    <ul className="ImageGallery">
      {images.map((image, index) => (
        <ImageGalleryItem image={image} key={index} onOpen={onOpen} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  onOpen: PropTypes.func.isRequired,
};

export { ImageGallery };

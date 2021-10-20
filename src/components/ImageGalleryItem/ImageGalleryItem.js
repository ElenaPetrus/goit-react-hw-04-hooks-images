import React from 'react';

function ImageGalleryItem({ image, onOpen }) {
  // console.log(image);
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onOpen(image.largeImageURL)}
    >
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export { ImageGalleryItem };

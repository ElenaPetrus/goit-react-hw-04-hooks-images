import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, src, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');
      onClose();
    }
  };

  const handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');
    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} width="1200px" height="800px" />
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;

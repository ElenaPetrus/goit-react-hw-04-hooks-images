import React from 'react';

function Button({ onLoadMore }) {
  return (
    <div className="containerButton">
      <button type="button" className="button" onClick={onLoadMore}>
        load more
      </button>
    </div>
  );
}

export { Button };

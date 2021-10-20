import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <p>{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export { ErrorMessage };

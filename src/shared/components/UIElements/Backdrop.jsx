import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

const Backdrop = ({ handleClose }) => {
  const content = <div className='backdrop' onClick={handleClose}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;

import React from 'react';

import './Avatar.scss';

const Avatar = ({ className, style, image, name, width, height }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={name} style={{ width: width, height: height }} />
    </div>
  );
};

export default Avatar;

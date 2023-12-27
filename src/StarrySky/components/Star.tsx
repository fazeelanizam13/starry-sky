import React from 'react';

const INITIAL_STAR_SIZE = 2;
const INITIAL_STAR_MARGIN = 2;

const Star = () => {
  return (
    <div
      className='star'
      style={{
        backgroundColor: 'white',
        borderRadius: '50%',
        width: INITIAL_STAR_SIZE,
        height: INITIAL_STAR_SIZE,
        margin: INITIAL_STAR_MARGIN,
      }}
    ></div>
  );
};

export default Star;

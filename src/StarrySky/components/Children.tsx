import React from 'react';
import { StarrySkyProps } from '..';

const Content = ({ content }: { content: StarrySkyProps['children'] }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {content}
    </div>
  );
};

export default Content;

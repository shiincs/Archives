import React from 'react';

// Link 컴포넌트는 부모 컴포넌트인 FilterLink에서 props를 받아서 렌더링되는 PC
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </a>
  );
};

export default Link;

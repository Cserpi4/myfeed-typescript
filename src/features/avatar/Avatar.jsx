import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt = 'User avatar', size = 50 }) => {
  if (!src) {
    // Ha nincs avatar URL, egy default kép vagy helyettesítő elem jelenik meg
    return (
      <div
        className="avatar placeholder"
        style={{ width: size, height: size, borderRadius: '50%' }}
        aria-label="No avatar"
      >
        ?
      </div>
    );
  }

  return (
    <img
      className="avatar"
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      style={{ borderRadius: '50%' }}
    />
  );
};

export default Avatar;

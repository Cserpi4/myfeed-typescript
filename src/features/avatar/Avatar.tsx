import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
}

const Avatar = ({ src, alt = 'User avatar', size = 50 }: AvatarProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
  };

  if (!src) {
    return (
      <div
        className="avatar avatar--placeholder"
        style={style}
        aria-label="No avatar"
      >
        <span>?</span>
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
      style={style}
    />
  );
};

export default Avatar;
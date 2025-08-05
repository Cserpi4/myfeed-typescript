import React from 'react';
import './Card.css';

const Card = ({ title, content, onClick }) => {
  return (
    <div className="card" onClick={onClick} tabIndex={0} role="button" aria-pressed="false">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{content}</div>
    </div>
  );
};

export default Card;

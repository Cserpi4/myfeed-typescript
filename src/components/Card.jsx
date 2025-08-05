import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ title, content }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {content && <p className="card-content">{content}</p>}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Card.defaultProps = {
  title: '',
  content: '',
};

export default Card;

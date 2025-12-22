import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function CommentText({ text }) {
  return (
    <div className="comment-text">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

CommentText.propTypes = {
  text: PropTypes.string,
};

CommentText.defaultProps = {
  text: '',
};

export default CommentText;

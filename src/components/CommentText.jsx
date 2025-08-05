import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from '../utils/markdownParser';

function CommentText({ text }) {
  return (
    <div
      className="comment-text"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
    />
  );
}

CommentText.propTypes = {
  text: PropTypes.string,
};

CommentText.defaultProps = {
  text: '',
};

export default CommentText;

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface CommentTextProps {
  text?: string;
}

function CommentText({ text = '' }: CommentTextProps) {
  return (
    <div className="comment-text">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default CommentText;
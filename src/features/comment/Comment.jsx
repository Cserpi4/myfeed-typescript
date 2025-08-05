import React from 'react';
import Avatar from '../avatar/Avatar';
import './Comment.css';

const Comment = ({ comments }) => {
  if (!comments.length) return <p>No comments available.</p>;

  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <li key={comment.id} className="comment-item">
          <Avatar src={comment.author_icon_img} alt={`${comment.author} avatar`} size={40} />
          <div className="comment-body">
            <p className="comment-author">{comment.author}</p>
            <p
              className="comment-text"
              dangerouslySetInnerHTML={{ __html: comment.body_html }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comment;

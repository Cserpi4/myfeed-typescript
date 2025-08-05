// src/features/comment/Comment.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, clearComments } from './commentSlice';
import './Comment.css';

const Comment = ({ postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment.comments);
  const status = useSelector((state) => state.comment.status);
  const error = useSelector((state) => state.comment.error);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }

    // Tisztítás, ha a komponens eltűnik vagy változik a postId
    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, postId]);

  if (status === 'loading') {
    return <div className="comment-loading">Loading comments...</div>;
  }

  if (status === 'failed') {
    return <div className="comment-error">Error: {error}</div>;
  }

  return (
    <div className="comment-container">
      {comments.length === 0 && <div className="no-comments">No comments found.</div>}
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="comment-author">{comment.author}</div>
          <div
            className="comment-body"
            dangerouslySetInnerHTML={{ __html: comment.body_html || comment.body }}
          />
        </div>
      ))}
    </div>
  );
};

export default Comment;

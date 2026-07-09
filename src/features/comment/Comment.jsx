
// src/features/comment/Comment.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, clearComments } from './commentSlice';
import CommentText from '../../components/CommentText';
import './Comment.css';

const Comment = ({ subreddit, postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment.comments);
  const loading = useSelector((state) => state.comment.loading);
  const error = useSelector((state) => state.comment.error);

  useEffect(() => {
    if (subreddit && postId) {
      dispatch(fetchComments({ subreddit, postId }));
    }

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, subreddit, postId]);

  if (loading) {
    return <div className="comment-loading">Loading comments...</div>;
  }

  if (error) {
    return <div className="comment-error">Error: {error}</div>;
  }

  return (
    <div className="comment-container">
      {comments.length === 0 && (
        <div className="no-comments">No comments found.</div>
      )}

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="comment-card"
          style={{ marginLeft: `${comment.depth * 16}px` }}
        >
          <div className="comment-author">u/{comment.author}</div>
          <CommentText text={comment.body} />
          <div className="comment-score">⬆ {comment.score}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
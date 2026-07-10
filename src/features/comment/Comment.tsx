import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, clearComments } from './commentSlice';
import { RootState } from '../../store/rootReducer';
import CommentText from '../../components/CommentText';
import './Comment.css';

interface CommentProps {
  subreddit: string;
  postId: string;
}

const Comment = ({ subreddit, postId }: CommentProps) => {
  const dispatch = useDispatch();

  const comments = useSelector((state: RootState) => state.comment.comments);
  const loading = useSelector((state: RootState) => state.comment.loading);
  const error = useSelector((state: RootState) => state.comment.error);

  useEffect(() => {
    if (subreddit && postId) {
      dispatch(fetchComments({ subreddit, postId }) as any);
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
        <div key={comment.id} className="comment-card">
          <div className="comment-author">u/{comment.author}</div>
          <CommentText text={comment.body} />
          <div className="comment-score">Score: {comment.score}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
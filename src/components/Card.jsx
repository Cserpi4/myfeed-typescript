import React, { useState } from 'react';
import './Card.css';

const Card = ({ post }) => {
  const {
    title,
    thumbnail,
    preview,
    subreddit_name_prefixed,
    author,
    ups,
    created_utc,
    num_comments,
    permalink,
    sr_detail,
    subreddit_icon_img,
  } = post;

  const imageUrl =
    preview?.images?.[0]?.resolutions?.[2]?.url.replace(/&amp;/g, '&') ??
    (thumbnail?.startsWith('http') ? thumbnail : null);

  const postTime = new Date(created_utc * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const avatarUrl = sr_detail?.icon_img || subreddit_icon_img;

  // 💡 Upvote/Downvote state
  const [vote, setVote] = useState(0);
  const [score, setScore] = useState(ups);
  const [animate, setAnimate] = useState(false);

  // 💬 Comments state
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  const handleUpvote = () => {
    if (vote === 1) {
      setVote(0);
      setScore(score - 1);
    } else {
      const change = vote === -1 ? 2 : 1;
      setVote(1);
      setScore(score + change);
    }
    triggerAnimation();
  };

  const handleDownvote = () => {
    if (vote === -1) {
      setVote(0);
      setScore(score + 1);
    } else {
      const change = vote === 1 ? -2 : -1;
      setVote(-1);
      setScore(score + change);
    }
    triggerAnimation();
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(`${permalink}.json`);
      const data = await response.json();
      const commentData =
        data[1]?.data?.children
          ?.filter((child) => child.kind === 't1')
          .map((child) => child.data) || [];
      setComments(commentData);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <div className="card">
      <div className="votes">
        <button
          className={`vote-button up ${vote === 1 ? 'active' : ''}`}
          onClick={handleUpvote}
        >
          ⬆
        </button>

        <p className={`vote-score ${animate ? 'pop' : ''}`}>
          {score >= 1000 ? (score / 1000).toFixed(1) + 'k' : score}
        </p>

        <button
          className={`vote-button down ${vote === -1 ? 'active' : ''}`}
          onClick={handleDownvote}
        >
          ⬇
        </button>
      </div>

      <div className="card-content">
        <div className="card-header">
          {avatarUrl && (
            <img className="avatar" src={avatarUrl} alt="Subreddit Icon" />
          )}
          <span className="subreddit">{subreddit_name_prefixed}</span>
        </div>

        <h3 className="title">{title}</h3>

        {imageUrl && <img className="thumbnail" src={imageUrl} alt={title} />}

        <div className="card-footer">
          <span>
            Posted by <strong>{author}</strong> • {postTime}
          </span>
          <button className="comment-toggle" onClick={toggleComments}>
            💬 {num_comments} {showComments ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className={`comments-section ${showComments ? 'show' : ''}`}>
          {loadingComments ? (
            <p className="loading">Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-author">u/{comment.author}</p>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

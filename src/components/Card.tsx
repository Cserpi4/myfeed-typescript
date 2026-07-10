import React, { useState } from 'react';
import Comment from '../features/comment/Comment';
import './Card.css';

interface PostPreviewImage {
  resolutions: { url: string }[];
}

interface PostPreview {
  images?: PostPreviewImage[];
}

interface SubredditDetail {
  icon_img?: string | null;
}

interface Post {
  id: string;
  title: string;
  thumbnail?: string | null;
  preview?: PostPreview | null;
  subreddit: string;
  subreddit_name_prefixed: string;
  author: string;
  ups: number;
  created_utc: number;
  num_comments: number;
  sr_detail?: SubredditDetail;
  subreddit_icon_img?: string | null;
}

interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const {
    id,
    title,
    thumbnail,
    preview,
    subreddit,
    subreddit_name_prefixed,
    author,
    ups,
    created_utc,
    num_comments,
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

  const [vote, setVote] = useState<number>(0);
  const [score, setScore] = useState<number>(ups);
  const [animate, setAnimate] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

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

  return (
    <div className="card">
      <div className="votes">
        <button
          className={`vote-button up ${vote === 1 ? 'active' : ''}`}
          onClick={handleUpvote}
        >
          Up
        </button>

        <p className={`vote-score ${animate ? 'pop' : ''}`}>
          {score >= 1000 ? (score / 1000).toFixed(1) + 'k' : score}
        </p>

        <a
          href={"https://lemmy.world/post/" + id}
          target="_blank"
          rel="noopener noreferrer"
          className="vote-button down"
        >
          Down
        </a>
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
            Posted by <strong>{author}</strong> - {postTime}
          </span>

          <button
            className="comment-toggle"
            onClick={() => setShowComments((prev) => !prev)}
          >
            Comments {num_comments} {showComments ? 'Hide' : 'Show'}
          </button>
        </div>

        {showComments && <Comment subreddit={subreddit} postId={id} />}
      </div>
    </div>
  );
};

export default Card;
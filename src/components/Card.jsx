import React from 'react';
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

  return (
    <div className="card">
      <div className="votes">
        <button>⬆</button>
        <p>{(ups / 1000).toFixed(1)}k</p>
        <button>⬇</button>
      </div>

      <div className="card-content">
        <div className="card-header">
          {post.sr_detail?.icon_img && (
            <img className="avatar" src={post.sr_detail.icon_img} alt="Subreddit Icon" />
            )}
          <span className="subreddit">{subreddit_name_prefixed}</span>
        </div>

        <h3 className="title">{title}</h3>

        {imageUrl && <img className="thumbnail" src={imageUrl} alt={title} />}

        <div className="card-footer">
          <span>
            Posted by <strong>{author}</strong> • {postTime}
          </span>
          <a
            href={`https://reddit.com${permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 {num_comments}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

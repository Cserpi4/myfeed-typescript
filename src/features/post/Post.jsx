import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from './postSlice';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.post);
  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!post) return null;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>u/{post.author}</p>
      <div>{post.selftext}</div>
    </article>
  );
};

export default Post;

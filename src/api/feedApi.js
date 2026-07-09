import client from './client';

const feedApi = {
  async fetchPosts() {
    const response = await client.get('/api/feed/popular');
    return response.data;
  },

  async fetchSubreddit(subreddit) {
    const response = await client.get(`/api/feed/subreddit/${subreddit}`);
    return response.data;
  },

  async fetchComments(subreddit, postId) {
    const response = await client.get(
      `/api/feed/comments/${subreddit}/${postId}`
    );
    return response.data;
  },

  async fetchSubreddits() {
    const response = await client.get('/api/feed/subreddits');
    return response.data;
  },

  async search(query) {
    const response = await client.get(`/api/feed/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export default feedApi;
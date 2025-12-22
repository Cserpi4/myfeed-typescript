import client from './client';

const redditApi = {
  // 🔥 popular posts
  async fetchPosts() {
    const response = await client.get('/api/reddit/popular');
    return response.data;
  },

  // 🔥 subreddit posts
  async fetchSubreddit(subreddit) {
    const response = await client.get(`/api/reddit/subreddit/${subreddit}`);
    return response.data;
  },

  // 🔥 comments
  async fetchComments(subreddit, postId) {
    const response = await client.get(
      `/api/reddit/comments/${subreddit}/${postId}`
    );
    return response.data;
  },

  // 🔥 subreddits list
  async fetchSubreddits() {
    const response = await client.get('/api/reddit/subreddits');
    return response.data;
  },

  // 🔥 search
  async search(query) {
    const response = await client.get(`/api/reddit/search?q=${query}`);
    return response.data;
  },
};

export default redditApi;

import fetchWithHeaders from '../utils/fetchWithHeaders.js';

const RedditService = {
  // 🔥 r/popular
  async getPopular() {
    try {
      return await fetchWithHeaders('/r/popular.json');
    } catch (error) {
      throw error;
    }
  },

  // 🔥 adott subreddit posztjai
  async getSubreddit(name) {
    try {
      return await fetchWithHeaders(`/r/${name}.json`);
    } catch (error) {
      throw error;
    }
  },

  // 🔥 kommentek egy poszthoz
  async getComments(subreddit, postId) {
    try {
      return await fetchWithHeaders(
        `/r/${subreddit}/comments/${postId}.json`
      );
    } catch (error) {
      throw error;
    }
  },

  // 🔥 KERESÉS (HOZZÁADVA, NEM ÁTÍRVA)
  async search(query) {
    try {
      return await fetchWithHeaders(`/search.json?q=${query}`);
    } catch (error) {
      throw error;
    }
  },

  // 🔥 SUBREDDIT LISTA (HOZZÁADVA, NEM ÁTÍRVA)
  async getSubreddits() {
    try {
      return await fetchWithHeaders('/subreddits/popular.json');
    } catch (error) {
      throw error;
    }
  },
};

export default RedditService;

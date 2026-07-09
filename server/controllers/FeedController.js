import feedService from '../services/feedService.js';

const FeedController = {
  async getPopular(req, res, next) {
    try {
      const data = await feedService.getPopular(); // ⚠️ redditService → feedService
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddit(req, res, next) {
    try {
      const { name } = req.params;
      const data = await feedService.getSubreddit(name); // ⚠️
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getComments(req, res, next) {
    try {
      const { subreddit, postId } = req.params;
      const data = await feedService.getComments(subreddit, postId); // ⚠️
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const data = await feedService.search(q); // ⚠️
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddits(req, res, next) {
    try {
      const data = await feedService.getSubreddits(); // ⚠️
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};

export default FeedController;
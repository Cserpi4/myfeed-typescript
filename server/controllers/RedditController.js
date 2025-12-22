import redditService from '../services/redditService.js';

const RedditController = {
  async getPopular(req, res, next) {
    try {
      const data = await redditService.getPopular();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddit(req, res, next) {
    try {
      const { name } = req.params;
      const data = await redditService.getSubreddit(name);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getComments(req, res, next) {
    try {
      const { subreddit, postId } = req.params;
      const data = await redditService.getComments(subreddit, postId);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const data = await redditService.search(q);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddits(req, res, next) {
    try {
      const data = await redditService.getSubreddits();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};

export default RedditController;

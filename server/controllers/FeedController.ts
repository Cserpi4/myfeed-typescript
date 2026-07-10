import { Request, Response, NextFunction } from 'express';
import feedService from '../services/feedService.js';

const FeedController = {
  async getPopular(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await feedService.getPopular();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = req.params.name as string;
      const data = await feedService.getSubreddit(name);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subreddit = req.params.subreddit as string;
      const postId = req.params.postId as string;
      const data = await feedService.getComments(subreddit, postId);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = req.query.q as string;
      const data = await feedService.search(q);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getSubreddits(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await feedService.getSubreddits();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};

export default FeedController;
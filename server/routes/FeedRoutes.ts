import { Router } from 'express';
import FeedController from '../controllers/FeedController.js';

const router = Router();

router.get('/popular', FeedController.getPopular);
router.get('/subreddit/:name', FeedController.getSubreddit);
router.get('/comments/:subreddit/:postId', FeedController.getComments);

router.get('/search', FeedController.search);
router.get('/subreddits', FeedController.getSubreddits);

export default router;
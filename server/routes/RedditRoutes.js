import { Router } from 'express';
import RedditController from '../controllers/RedditController.js';

const router = Router();

router.get('/popular', RedditController.getPopular);
router.get('/subreddit/:name', RedditController.getSubreddit);
router.get('/comments/:subreddit/:postId', RedditController.getComments);

// 🔥 FRONTENDHEZ SZÜKSÉGES ROUTES
router.get('/search', RedditController.search);
router.get('/subreddits', RedditController.getSubreddits);

export default router;

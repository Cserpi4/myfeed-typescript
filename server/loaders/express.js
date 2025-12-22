import express from 'express';
import cors from 'cors';
import RedditRoutes from '../routes/RedditRoutes.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const expressLoader = () => {
  const app = express();

  // 🔥 IDEIGLENES: engedj minden origint
  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(express.json());
  app.use('/api/reddit', RedditRoutes);
  app.use(errorMiddleware);

  return app;
};

export default expressLoader;

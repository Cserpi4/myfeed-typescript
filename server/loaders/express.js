import express from 'express';
import cors from 'cors';
import RedditRoutes from '../routes/RedditRoutes.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import config from '../config/env.js';

const expressLoader = () => {
  const app = express();

  app.use(cors({ origin: config.server.clientUrl }));
  app.use(express.json());

  app.use('/api/reddit', RedditRoutes);

  app.use(errorMiddleware);

  return app;
};

export default expressLoader;

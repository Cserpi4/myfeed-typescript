import express from 'express';
import cors from 'cors';
import RedditRoutes from '../routes/RedditRoutes.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import config from '../config/env.js';

const expressLoader = () => {
  const app = express();

  const allowedOrigins = [
    'http://localhost:3001',
    'https://myreddit-demo.netlify.app',
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );

  app.use(express.json());
  app.use('/api/reddit', RedditRoutes);
  app.use(errorMiddleware);

  return app;
};

export default expressLoader;

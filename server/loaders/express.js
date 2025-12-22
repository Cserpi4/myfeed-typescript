import express from 'express';
import cors from 'cors';
import RedditRoutes from '../routes/RedditRoutes.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const expressLoader = () => {
  const app = express();

  // ✅ HELYES CORS BEÁLLÍTÁS (Netlify + local dev)
  app.use(
    cors({
      origin: [
        'https://myreddit-demo.netlify.app',
        'http://localhost:3001',
      ],
      methods: ['GET', 'POST'],
    })
  );

  app.use(express.json());
  app.use('/api/reddit', RedditRoutes);
  app.use(errorMiddleware);

  return app;
};

export default expressLoader;

import express from 'express';
import cors from 'cors';
import FeedRoutes from '../routes/FeedRoutes.js'; // ⚠️ fájlnév javítva
import errorMiddleware from '../middlewares/errorMiddleware.js';

const expressLoader = () => {
  const app = express();

  app.use(
    cors({
      origin: [
        'https://myreddit-demo.netlify.app', // ezt is majd myfeed-re, ha átnevezed a Netlify appot
        'http://localhost:3001',
      ],
      methods: ['GET', 'POST'],
    })
  );

  app.use(express.json());
  app.use('/api/feed', FeedRoutes); // ⚠️ mount path javítva /api/reddit → /api/feed
  app.use(errorMiddleware);

  return app;
};

export default expressLoader;
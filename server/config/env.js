import dotenv from 'dotenv';

dotenv.config();

const env = {
  server: {
    port: process.env.PORT || 3000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3001',
  },
  reddit: {
    baseUrl: 'https://www.reddit.com',
    userAgent: 'MyRedditApp/1.0 (by u/yourusername)',
  },
};

export default env;

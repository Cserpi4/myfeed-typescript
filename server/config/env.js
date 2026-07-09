import dotenv from 'dotenv';

dotenv.config();

const env = {
  server: {
    port: process.env.PORT || 3000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3001',
  },
  lemmy: {
    baseUrl: process.env.LEMMY_INSTANCE_URL || 'https://lemmy.world',
  },
};

export default env;
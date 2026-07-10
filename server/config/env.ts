import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  server: {
    port: number | string;
    clientUrl: string;
  };
  lemmy: {
    baseUrl: string;
  };
}

const env: EnvConfig = {
  server: {
    port: process.env.PORT || 3000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3001',
  },
  lemmy: {
    baseUrl: process.env.LEMMY_INSTANCE_URL || 'https://lemmy.world',
  },
};

export default env;
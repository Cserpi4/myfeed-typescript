import expressLoader from './express.js';
import config from '../config/env.js';

const startExpressServer = async () => {
  try {
    const app = expressLoader();
    const PORT = config.server.port || 3000;

    app.listen(PORT, () => {
      console.log(`✅ Server running on: http://localhost:${PORT}`);
      console.log(`🌍 Client URL: ${config.server.clientUrl}`);
    });
  } catch (err) {
    console.error('❌ Express startup failed:', err);
    process.exit(1);
  }
};

export default startExpressServer;

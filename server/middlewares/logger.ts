type LogFunction = (msg: string) => void;

interface Logger {
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}

const logger: Logger = {
  info: (msg: string): void => console.log('[INFO]', msg),
  warn: (msg: string): void => console.warn('[WARN]', msg),
  error: (msg: string): void => console.error('[ERROR]', msg),
};

export default logger;
import { Response } from 'express';

interface AppError extends Error {
  status?: number;
}

const handleError = (
  res: Response,
  error: AppError,
  fallbackMessage: string = 'Something went wrong'
): Response => {
  console.error(error);

  const status = error.status || 500;

  return res.status(status).json({
    success: false,
    message: error.message || fallbackMessage,
  });
};

export default handleError;
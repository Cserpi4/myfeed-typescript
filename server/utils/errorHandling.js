const handleError = (res, error, fallbackMessage = 'Something went wrong') => {
  console.error(error);

  const status = error.status || 500;

  return res.status(status).json({
    success: false,
    message: error.message || fallbackMessage,
  });
};

export default handleError;

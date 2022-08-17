const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'Server Error' : err.message;
  res.ststus(statusCode).send({ message });
  next();
};

module.exports = errorHandler;

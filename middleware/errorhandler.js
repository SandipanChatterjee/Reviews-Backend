const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(404).json({ error: err.message });
};

module.exports = errorHandler;

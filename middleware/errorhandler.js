const errorHandler = (errMsg, res, next) => {
  res.status(404).json({ error: errMsg });
  // next();
};

module.exports = errorHandler;

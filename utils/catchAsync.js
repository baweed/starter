const catchAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch((err) =>
    res.status(400).json({
      status: 'fail',
      message: err,
    }),
  );

export default catchAsync;

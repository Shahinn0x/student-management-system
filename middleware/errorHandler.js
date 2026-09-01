const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;


  if (err.name === 'CastError') {
    const message = `Invalid Resource ID format: ${err.value}`;
    return res.status(400).json({ success: false, error: message });
  }


  if (err.code === 11000) {
    const message = 'Duplicate field value entered: Email already exists.';
    return res.status(400).json({ success: false, error: message });
  }

  

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ success: false, error: message });
  }
  

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error', 
  });
};

export default errorHandler;
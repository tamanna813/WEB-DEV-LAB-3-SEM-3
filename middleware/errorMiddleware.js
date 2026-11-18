function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    statusCode = 400;
    error.message = Object.values(error.errors).map((item) => item.message).join(", ");
  }

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    statusCode = 400;
    error.message = "Invalid product ID";
  }

  // Duplicate SKU
  if (error.code === 11000) {
    statusCode = 409;
    error.message = "A product with this SKU already exists";
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error"
  });
}

module.exports = { notFound, errorHandler };
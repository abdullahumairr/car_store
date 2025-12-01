export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const bodyStatus = statusCode >= 500 ? "error" : "fail";

  res.status(statusCode).json({
    status: bodyStatus,
    message: err.message || "internal server error",
  });
};

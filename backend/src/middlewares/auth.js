import jwt from "jsonwebtoken";
import { ResponseError } from "../errors/responseError.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw new ResponseError(401, "token tidak ditemukan");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new ResponseError(401, "token tidak valid");
  }
};

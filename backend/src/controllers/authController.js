import * as AuthService from "../services/authService.js";

export const registerHandler = async (req, res, next) => {
  try {
    const response = await AuthService.register(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const response = await AuthService.login(req.body);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

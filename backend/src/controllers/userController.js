// Get all Users

import * as UserService from "../services/userService.js";

export const getAllUsersHandler = async (req, res, next) => {
  try {
    const response = await UserService.getAllUsersHandler();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserByIdHandler(id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUsersHandler = async (req, res, next) => {
  try {
    const response = await UserService.createUsersHandler(req.body);

    res.status(201).json({
      status: "success",
      message: "user create successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUsersHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.updateUsersHandler(id, req.body);

    res.status(201).json({
      status: "success",
      message: "user update successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsersHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.deleteUsersHandler(id, req.body);

    res.status(201).json({
      status: "success",
      message: "user delete successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

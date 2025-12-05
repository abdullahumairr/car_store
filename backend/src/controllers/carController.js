// Get all Users

import * as carService from "../services/carService.js";

export const getAllCarsHandler = async (req, res, next) => {
  try {
    const response = await carService.getAllCarsHandler();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await carService.getCarByIdHandler(id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createCarHandler = async (req, res, next) => {
  try {
    const response = await carService.createCarHandler(
      req.body,
      req.user
    );

    res.status(201).json({
      status: "success",
      message: "Car created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCarHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await carService.updateCarHandler(
      id,
      req.body,
      req.user
    );

    res.status(200).json({
      status: "success",
      message: "Car updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCarHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await carService.deleteCarHandler(id, req.body);

    res.status(201).json({
      status: "success",
      message: "Car delete successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

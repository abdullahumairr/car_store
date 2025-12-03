import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createCarSchema,
  updateCarSchema,
} from "../validations/carValidation.js";
import validate from "../validations/validate.js";

export const getAllCarsHandler = async () => {
  const [cars] = await pool.query(
    `SELECT id, user_id, car_name, brand, year, mileage, description, price, status 
     FROM cars`
  );

  return cars;
};

export const getCarByIdHandler = async (id) => {
  const [cars] = await pool.query(
    `SELECT id, user_id, car_name, brand, year, mileage, description, price, status 
     FROM cars WHERE id=?`,
    [id]
  );

  if (cars.length === 0) {
    throw new ResponseError(404, "car not found");
  }

  return cars[0];
};

export const createCarHandler = async (request) => {
  const user_id = request.user.id; 

  const validated = validate(createCarSchema, request);
  const {
    car_name,
    brand,
    year,
    mileage,
    description,
    price,
    address,
    image_url,
  } = validated;

  const [result] = await pool.query(
    `INSERT INTO cars (user_id, car_name, brand, year, mileage, description, price, address, image_url, status) 
     VALUES (?,?,?,?,?,?,?,?,?, 'available')`,
    [
      user_id,
      car_name,
      brand,
      year,
      mileage,
      description,
      price,
      address,
      image_url,
    ]
  );

  return {
    id: result.insertId,
    user_id,
    car_name,
    brand,
    year,
    mileage,
    description,
    price,
    address,
    image_url,
    status: "available",
  };
};

export const updateCarHandler = async (id, request) => {
  const validated = validate(updateCarSchema, request);
  const {
    user_id,
    car_name,
    brand,
    year,
    mileage,
    description,
    price,
    address,
    image_url,
    status,
  } = validated;

  await pool.query(
    `UPDATE cars 
     SET user_id=?, car_name=?, brand=?, year=?, mileage=?, description=?, price=?, address=?, image_url=?, status=? 
     WHERE id=?`,
    [
      user_id,
      car_name,
      brand,
      year,
      mileage,
      description,
      price,
      address,
      image_url,
      status,
      id,
    ]
  );

  const [updatedCar] = await pool.query(
    `SELECT id, user_id, car_name, brand, year, mileage, description, price, address, image_url, status 
     FROM cars WHERE id=?`,
    [id]
  );

  return updatedCar[0];
};

export const deleteCarHandler = async (id) => {
  const [result] = await pool.query(`DELETE FROM cars WHERE id=?`, [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "car not found");
  }

  return { message: "Car deleted successfully" };
};

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

export const createCarHandler = async (request, files, user) => {
  const validated = validate(createCarSchema, request);
  const { car_name, brand, year, mileage, description, price, address } =
    validated;

  const user_id = user.id;

  const imageUrls =
    files?.map(
      (file) => `http://localhost:7777/uploads/cars/${file.filename}`
    ) || [];

  const [result] = await pool.query(
    `INSERT INTO cars 
     (user_id, car_name, brand, year, mileage, description, price, address, image_url) 
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      user_id,
      car_name,
      brand,
      year,
      mileage,
      description,
      price,
      address,
      JSON.stringify(imageUrls),
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
    image_url: imageUrls,
    status: "available",
  };
};

export const updateCarHandler = async (id, request, files, user) => {
  const validated = validate(updateCarSchema, request);
  const {
    car_name,
    brand,
    year,
    mileage,
    description,
    price,
    status,
    address,
  } = validated;

  const user_id = user.id;

  const imageUrls =
    files?.map(
      (file) => `http://localhost:7777/uploads/cars/${file.filename}`
    ) || [];

  await pool.query(
    `UPDATE cars 
     SET user_id=?, car_name=?, brand=?, year=?, mileage=?, 
         description=?, price=?, status=?, address=?, image_url=? 
     WHERE id=?`,
    [
      user_id,
      car_name,
      brand,
      year,
      mileage,
      description,
      price,
      status,
      address,
      JSON.stringify(imageUrls),
      id,
    ]
  );

  const [updatedCar] = await pool.query(`SELECT * FROM cars WHERE id=?`, [id]);

  return updatedCar[0];
};

export const deleteCarHandler = async (id) => {
  const [result] = await pool.query(`DELETE FROM cars WHERE id=?`, [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "car not found");
  }

  return { message: "Car deleted successfully" };
};

import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createCarSchema,
  updateCarSchema,
} from "../validations/carValidation.js";
import validate from "../validations/validate.js";

export const getAllCarsHandler = async () => {
  const [cars] = await pool.query(
    `SELECT id, user_id, car_name, brand, year, mileage, description, price, status, image_url
     FROM cars`
  );
  return cars;
};

export const getCarByIdHandler = async (id) => {
  const [cars] = await pool.query(
    `SELECT id, user_id, car_name, brand, year, mileage, description, price, status, address, image_url 
     FROM cars WHERE id=?`,
    [id]
  );

  if (cars.length === 0) throw new ResponseError(404, "car not found");

  return cars[0];
};

export const createCarHandler = async (request, user) => {
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

  const user_id = user.id;

  // FIX: pakai link, bukan upload file
  let images = [];
  try {
    images = Array.isArray(image_url)
      ? image_url
      : typeof image_url === "string"
      ? JSON.parse(image_url)
      : [];
  } catch {
    images = [];
  }

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
      JSON.stringify(images),
    ]
  );

  return {
    id: result.insertId,
    car_name,
    brand,
    year,
    mileage,
    description,
    price,
    address,
    image_url: images,
    status: "available",
  };
};

export const updateCarHandler = async (id, request, user) => {
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
    image_url,
  } = validated;

  const user_id = user.id;

  // FIX: pakai link saja
  let images = [];
  try {
    images = Array.isArray(image_url)
      ? image_url
      : typeof image_url === "string"
      ? JSON.parse(image_url)
      : [];
  } catch {
    images = [];
  }

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
      JSON.stringify(images),
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

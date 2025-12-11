import { pool } from "../config/db.js";

// GET ALL
export const getAllCarsHandler = async () => {
  const [rows] = await pool.query("SELECT * FROM cars ORDER BY id DESC");
  return rows;
};

// GET BY ID
export const getCarByIdHandler = async (id) => {
  const [rows] = await pool.query("SELECT * FROM cars WHERE id = ?", [id]);
  if (rows.length === 0) throw new Error("Car not found");
  return rows[0];
};

// CREATE
export const createCarHandler = async (data, user) => {
  const newData = {
    ...data,
    image_url: Array.isArray(data.image_url)
      ? JSON.stringify(data.image_url)
      : data.image_url,
  };

  const [result] = await pool.query(
    `INSERT INTO cars (user_id, car_name, brand, year, mileage, description, price, address, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      newData.car_name,
      newData.brand,
      newData.year,
      newData.mileage,
      newData.description,
      newData.price,
      newData.address,
      newData.image_url,
    ]
  );

  return { id: result.insertId, ...newData, user_id: user.id };
};

// UPDATE
export const updateCarHandler = async (id, data, user) => {
  const [car] = await pool.query("SELECT * FROM cars WHERE id = ?", [id]);
  if (car.length === 0) throw new Error("Car not found");

  if (car[0].user_id !== user.id && user.role !== "admin") {
    throw new Error("Access denied");
  }

  const newData = {
    ...data,
    image_url: Array.isArray(data.image_url)
      ? JSON.stringify(data.image_url)
      : data.image_url,
  };

  await pool.query("UPDATE cars SET ? WHERE id = ?", [newData, id]);

  return { id, ...newData };
};

// DELETE
export const deleteCarHandler = async (id, user) => {
  const [car] = await pool.query("SELECT * FROM cars WHERE id = ?", [id]);
  if (car.length === 0) throw new Error("Car not found");

  await pool.query("DELETE FROM cars WHERE id = ?", [id]);

  return { message: "Car deleted" };
};




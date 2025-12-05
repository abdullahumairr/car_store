import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

export const getAllUsersHandler = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );
  return users;
};

export const getUserByIdHandler = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "user not found");
  }

  return users[0];
};

export const createUsersHandler = async (request) => {
  const validated = validate(createUserSchema, request);

  const { fullname, username, email, password, role } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [insert] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
    [fullname, username, email, hashedPassword, role]
  );

  return {
    id: insert.insertId,
    fullname,
    username,
    email,
    role,
  };
};

export const updateUsersHandler = async (id, request) => {
  const validated = validate(updateUserSchema, request);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  let hashedPassword = null;

  // kalau admin tidak mengisi password → jangan update password
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const [result] = await pool.query(
    `
    UPDATE users 
    SET fullname = COALESCE(?, fullname),
        username = COALESCE(?, username),
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        role = COALESCE(?, role),
        address = COALESCE(?, address),
        phone_number = COALESCE(?, phone_number),
        age = COALESCE(?, age)
    WHERE id = ?
  `,
    [
      fullname || null,
      username || null,
      email || null,
      hashedPassword,
      role || null,
      address || null,
      phone_number || null,
      age || null,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }

  const [userUpdate] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  return userUpdate[0];
};

export const deleteUsersHandler = async (id) => {
  const [del] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (del.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }

  return true;
};

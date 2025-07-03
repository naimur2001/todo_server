import pool from "../config/db.js";
import bcrypt from "bcrypt"

export const createUser = async (name,username,email,password)=>{
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
  INSERT INTO users (name,username,email,password) VALUES ($1,$2,$3,$4)
      RETURNING username, email, created_at

  `
 const { rows } = await pool.query(query, [name,username, email, hashedPassword]);
  return rows[0];
}


// NEW: Check by username OR email
export const findUserByUsernameOrEmail = async (input) => {
  const query = `
    SELECT * FROM users 
    WHERE username = $1 OR email = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [input]);
  return rows[0];
};
export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users 
    WHERE email = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};
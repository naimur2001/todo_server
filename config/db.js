import pg, { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// const {Pool}=pg
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS);

const pool = new Pool ({
  user:process.env.DB_USER ,
  host: process.env.DB_HOST ,
  database: process.env.DB_NAME ,
  password:  process.env.DB_PASS ,
  port:process.env.DB_PORT
})

export default pool
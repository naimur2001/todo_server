import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import pool from './config/db.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/",async (req,res)=>{
try {
   
  res.send(`mama pik Database is ---> ${result.rows[0].current_database}`)
} catch (error) {
res.status(500).json({ error: error.message });
}
})


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});

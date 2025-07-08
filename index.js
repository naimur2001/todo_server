dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
// import pool from './,]config/db.js';
import userRoute from './routes/user.route.js';
import todoRoute from './routes/todo.route.js';
import cookieParser from "cookie-parser";


const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

app.get("/",async (req,res)=>{
try {
   
  res.send(`mama pik Database is ---> ${result.rows[0].current_database}`)
} catch (error) {
res.status(500).json({ error: error.message });
}
})

app.use('/api/v1/users', userRoute);
app.use('/api/v1/todos', todoRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});

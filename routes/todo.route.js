//todo route
import express from 'express';
import {addTodo,getTodosByUserId,deleteTodo } from '../controllers/todoController.js';
const router = express.Router();

router.post('/todo', addTodo);
router.get('/todo', getTodosByUserId);
// router.get('/todo/:id', getTodoById);
// router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router;
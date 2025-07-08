import pool from "../config/db.js";

export const createTodo = async (title,description)=>{

  const query = `INSERT INTO todolist (title,description, user_id) VALUES ($1,$2,$3) 
  RETURNING *
  `
 const { rows } = await pool.query(query, [title, description]);
  return rows[0];

}

export const getAllTodos = async ()=>{
  const query = `SELECT * FROM todolist ORDER BY created_at DESC `

  const {rows} = await pool.query(query)
  return rows
}

export const getTodoById = async (id)=>{
  const query = `
  SELECT * FROM todolist WHERE id = $1 AND user_id = $2
  `
  const {rows} =await pool.query(query,[id])
  return rows[0]
}

//

export const getTodosByUserId = async (userId) => {
  const query = `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};
// update

export const updateTodo = async (id, { title, description, completed }) => {
  const query = `
    UPDATE todos
    SET 
      title = $1,
      description = $2,
      completed = $3
    WHERE id = $4
    RETURNING *
  `;

  const { rows } = await pool.query(query, [title, description, completed, id]);
  return rows[0];
};


// Delete todo
export const deleteTodo = async (id) => {
  const query = `DELETE FROM todos WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
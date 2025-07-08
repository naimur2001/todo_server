import { createTodo } from "../services/todoService.js"


export const addTodo = async (req, res, next) => {

  try {
    const parsed = createTodoSchema.safeParse(req.body);
    if(!parsed.success){return res.status(400).json({ error: parsed.error.message });}

    const {title,description,user_id}=parsed.data
    const newtodo= await createTodo(title,description,user_id)
    res.status(201).json(newtodo) 

  } catch (error) {
    res.status(500).json({ message: "Server error" });  
  next(error)
  }
}

//

export const getTodosByUserId = async (req, res, next) => {

  try {
    const {userId}=req.params
    const todo= await getTodosByUserId(userId)
    res.status(200).json(todo)  

  } catch (error) {
    res.status(500).json({ message: "Server error" });  
    next(error)
  }
} 


//
export const deleteTodo = async (req, res, next) => {
  try {
    const {id}=req.params
     const todo =  await deleteTodo(id)
     res.status(200).json(todo)
  } catch (error) {
     res.status(500).json({ message: "Server error" });  
    next(error)
  }
}
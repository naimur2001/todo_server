import { createUser, findUserByEmail, findUserByUsernameOrEmail } from "../services/userService.js";
import { loginSchema } from "../validators/userValidation.js";

export const signup= async(req,res,next)=>{
try {
  const parsed =  signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }

  const existing= await findUserByEmail(parsed.data.email);
  if (existing) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }

  const {name, username, email, password} = parsed.data



  const newUser = await createUser(name, username, email, password);
  res.status(201).json({ username: newUser.username, email: newUser.email, created_at: newUser.created_at });

} catch (error) {
  res.status(500).json({ message: "Server error" });  
  next(error)
}
}

export const login=async(req,res,next)=>{
  try {
    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success){
      return res.status(400).json({error:parsed.error.message})
    }
    const { usernameOrEmail, password } = parsed.data;
    const user= await findUserByUsernameOrEmail(usernameOrEmail);

    if (!user) {
          return res.status(400).json({ error: "Inavlid Credentials" });
    }


    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

        res.status(200).json({ message: `Welcome, ${user.name}!` });

    }
    
   catch (error) {
    res.status(500).json({ message: "Server error" });  
    next(error)
  }
}
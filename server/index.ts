import express from 'express';
import createUser from './controllers/user.ts';
import createRecipe from './controllers/recipe.ts';
import { connectDB } from './config/db.ts';
const app = express();
const port = 3000;

connectDB()

app.use(express.json());

app.post('/user/createuser', createUser)
app.post('/recipes/createrecipe', createRecipe)
app.get('/', (req, res) => {
  res.json({hello: "world"})
})

app.listen(port, () => {
  console.log(`Server running on port ${port}: http://localhost:3000/`);
});

/* 
Think of routes as “endpoints” that your app exposes to the outside world (the frontend or other clients).

They define which URL triggers which action.

Example:

app.get('/users', getAllUsers);
app.post('/users', createUser);
*/
import { createUser } from './controllers/user.ts';
import express from 'express';
const app = express();
const port = 3000;

app.post('/user/createuser', createUser)

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
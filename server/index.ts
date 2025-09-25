import { connectDB } from './config/db.ts';
import app from './app.ts';
const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
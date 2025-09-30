import { Router } from 'express';
import userRoutes from "./userRoutes/userRoutes.ts"
import recipeRoutes from "./recipeRoutes/recipeRoutes.ts"

const router = Router();



router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export default router;
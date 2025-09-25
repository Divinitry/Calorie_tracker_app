import { Router } from 'express';
import createRecipe from '../../controllers/recipe.ts';

const router = Router();

router.post('/createrecipe', createRecipe);

export default router;

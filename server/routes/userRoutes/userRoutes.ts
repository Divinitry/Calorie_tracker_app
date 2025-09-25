import { Router } from 'express';
import createUser from '../../controllers/user.ts';

const router = Router();

router.post('/createuser', createUser);

export default router;
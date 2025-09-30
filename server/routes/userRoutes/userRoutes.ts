import { Router } from 'express';
import { createUser, checkUsernameAvailability } from '../../controllers/user.ts';

const router = Router();

router.post('/createuser', createUser);
router.get('/:username', checkUsernameAvailability)

export default router;
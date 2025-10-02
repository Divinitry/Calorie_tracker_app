import { Router } from 'express';
import { createUser, login, checkUsernameAvailability, requestReset, confirmReset } from '../../controllers/user.ts';

const router = Router();

router.post('/createuser', createUser);
router.post('/requestReset', requestReset)
router.post('/confirmReset', confirmReset)
router.post('/login', login)
router.get('/:username', checkUsernameAvailability)

export default router;
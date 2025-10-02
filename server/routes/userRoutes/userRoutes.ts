import { Router } from 'express';
import { createUser, checkUsernameAvailability, requestReset, confirmReset } from '../../controllers/user.ts';

const router = Router();

router.post('/createuser', createUser);
router.post('/requestReset', requestReset)
router.post('/confirmReset', confirmReset)
router.get('/:username', checkUsernameAvailability)

export default router;
import { Router } from 'express';
import { createUser, checkUsernameAvailability, requestReset, confirmReset } from '../../controllers/user.ts';

const router = Router();

router.post('/createuser', createUser);
router.get('/:username', checkUsernameAvailability)
router.post('/:email/requestReset', requestReset)
router.get('/:email/confirmReset', confirmReset)

export default router;
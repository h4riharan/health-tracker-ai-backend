import { Router } from 'express';
import AuthController from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/auth';

const router = Router();

router.post('/register', validateRegistration, AuthController.register.bind(AuthController));
router.post('/login', validateLogin, AuthController.login.bind(AuthController));

export default router;
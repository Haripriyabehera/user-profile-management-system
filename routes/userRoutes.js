import express from 'express';
import userController from '../controllers/userController.js'; 
import { checkSchema } from 'express-validator';
import { userUpdateSchema } from '../validators/userValidator.js';
import authenticateUser from '../middleware/authMiddleware.js'; 


const router = express.Router();

router.get('/profile/:id', authenticateUser, userController.getProfile);
router.put('/updateProfile/:id', authenticateUser, checkSchema(userUpdateSchema), userController.updateProfile);

export default router;


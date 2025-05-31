import express from 'express';
import adminController from '../controllers/adminController.js';
import authenticateUser from '../middleware/authMiddleware.js';
import authorizeUser from '../middleware/authorize.js';

const router = express.Router();


router.get('/:id', authenticateUser, authorizeUser(['admin']), adminController.getProfileById);
router.put('/update/:id', authenticateUser, authorizeUser(['admin']), adminController.updateUserByAdmin);

export default router;

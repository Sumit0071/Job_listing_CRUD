import express from 'express';
import { createUser, getUsers, likeUser, loginUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id/like').post(protect, likeUser); // Protect likeUser route
router.route('/login').post(loginUser); // Add login route

export default router;

import express from 'express';
import { createUser, getUsers, likeUser } from '../controllers/userController.js';

const router = express.Router();

router.route( '/' ).get( getUsers ).post( createUser );
router.route( '/:id/like' ).post( likeUser );

export default router;

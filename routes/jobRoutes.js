import express from 'express';
import { getJobs, applyForJob } from '../controllers/jobController.js';

const router = express.Router();

router.route( '/' ).get( getJobs );
router.route( '/:id/apply' ).post( applyForJob );

export default router;

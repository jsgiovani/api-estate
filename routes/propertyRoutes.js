import express from 'express';
import { verifyToken } from '../utils/veriyUser.js';
import { index, store } from '../controllers/PropertyController.js';


const router = express.Router();



router.get('/', index);
router.post('/', store )


export default router
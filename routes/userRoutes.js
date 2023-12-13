import express from 'express';
import { remove, update } from '../controllers/UserController.js';
import { verifyToken } from '../utils/veriyUser.js';


const router = express.Router();



router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);


export default router;
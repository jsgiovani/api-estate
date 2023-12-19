import express from 'express';
import { remove, update, index } from '../controllers/UserController.js';
import { verifyToken } from '../utils/veriyUser.js';


const router = express.Router();



router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);
router.get('/properties/:id', index);

export default router;
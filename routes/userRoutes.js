import express from 'express';
import { remove, update, index, show } from '../controllers/UserController.js';
import { verifyToken } from '../utils/veriyUser.js';


const router = express.Router();



router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);
router.get('/properties/:id', index);
router.get('/:id', verifyToken, show);

export default router;
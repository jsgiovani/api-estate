import express from 'express';
import { verifyToken } from '../utils/veriyUser.js';
import { index, remove, store } from '../controllers/PropertyController.js';


const router = express.Router();



router.get('/', index);
router.post('/', store );
router.delete('/:id', verifyToken,  remove );


export default router
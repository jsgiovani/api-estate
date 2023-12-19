import express from 'express';
import { verifyToken } from '../utils/veriyUser.js';
import { index, remove, store, show, update } from '../controllers/PropertyController.js';


const router = express.Router();



router.get('/', index);
router.get('/:id',  show );
router.post('/', verifyToken, store );
router.put('/:id', verifyToken,  update );
router.delete('/:id', verifyToken,  remove );


export default router
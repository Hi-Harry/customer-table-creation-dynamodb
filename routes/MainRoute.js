import express from 'express';
import { createCustomer } from '../controllers/MainController.js';


const router = express.Router();

router.post('/', createCustomer);

export default router;

import express from 'express';
const router = express.Router();


import { logIn, dashboard } from '../controllers/authController.js';

router.get('/', logIn);

router.get('/dashboard', dashboard);


export default router;
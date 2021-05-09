import express from 'express';
const router = express.Router();

import { signin, signup } from '../controllers/users.js';
// import { viewUsers, addUser, findUser, getUserForm, getEditForm, updateUser, deleteUser, singleUser } from '../controllers/adminController.js';

//Front routes with react

router.post('/signin', signin);
router.post('/signup', signup);


export default router;

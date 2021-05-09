import express from 'express';
const router = express.Router();

import { viewUsers, addUser, findUser, getUserForm, getEditForm, updateUser, deleteUser, singleUser} from '../controllers/staffController.js';



//Admin routes
router.get('/', viewUsers);
router.post('/', findUser);

router.get('/adduser', getUserForm);
router.post('/adduser', addUser);
router.get('/edituser/:id', getEditForm);
router.post('/edituser/:id', updateUser, () => {
    res.render('/', {message: req.flash('message')})
});
router.get('/viewuser/:id', singleUser);

router.get('/:id', deleteUser);


export default router;

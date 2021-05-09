import express from 'express';
const router = express.Router();


import { create, findAll, findOne, update, remove } from '../controllers/customersController.js';

// Create new customer
router.post('/customers', create);

// Retrive all customers
router.get('/customers', findAll);

// Find single customer
router.post('/customers/:customerId', findOne);

// Update a customer with customerId
router.put('/customers/:customerId', update);

// Delete customer by customerId
router.post('/customers/:customerId', remove);

// // Delete all customers
// router.delete('/customers', deleteAll);


export default router;
import express from 'express';
import { createCustomer, modifyCustomer, readAllCustomers, readCustomer, removeCustomer  } from '../controllers/MainController.js';


const router = express.Router();


// POST /customers
router.post("/", createCustomer);

//GET /customers
router.get("/readallcustomers", readAllCustomers);

// GET /customers/:uid
router.get("/:uid", readCustomer);

// PUT /customers/:uid
router.put("/:uid", modifyCustomer);

// DELETE /customers/:uid
router.delete("/:uid", removeCustomer);

export default router;

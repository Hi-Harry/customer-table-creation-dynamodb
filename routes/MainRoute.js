import express from 'express';
import { createCustomer, modifyCustomer, readAllCustomers, readCustomer, readCustomerByGSI, readCustomerByType, removeCustomer  } from '../controllers/MainController.js';


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

//GET /customers/gsi/:customerCode
router.get("/gsi/:customerCode", readCustomerByGSI);

//GET /customers/type/:customer_type
router.get("/type/:customer_type", readCustomerByType);

export default router;

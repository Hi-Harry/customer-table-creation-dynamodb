import {
  saveCustomer,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerCode,
  getCustomerByType
} from "../models/MainModel.js";

// CREATE
export const createCustomer = async (req, res) => {
  try {
    const result = await saveCustomer(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Could not create customer" });
  }
};

// READ (Single)
export const readCustomer = async (req, res) => {
  try {
    const { uid } = req.params;
    const customer = await getCustomer(uid);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error reading customer:", error);
    res.status(500).json({ error: "Could not fetch customer" });
  }
};

// READ (All)
export const readAllCustomers = async (_req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error("Error reading all customers:", error);
    res.status(500).json({ error: "Could not fetch customers" });
  }
};

// UPDATE
export const modifyCustomer = async (req, res) => {
  try {
    const { uid } = req.params;
    const updated = await updateCustomer(uid, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Could not update customer" });
  }
};

// DELETE
export const removeCustomer = async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await deleteCustomer(uid);
    res.json(result);
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Could not delete customer" });
  }
};

export const readCustomerByGSI = async (req, res) => {
  try {
    const { customerCode } = req.params;

    if (!customerCode) {
      return res.status(400).json({ error: "customerCode is required" });
    }

    const customers = await getCustomerCode(customerCode);

    if (!customers) {
      return res.status(404).json({ error: `No customers found for customerCode: ${customerCode}` });
    }

    res.json(customers);
  } catch (error) {
    console.error("Error reading customer by GSI:", error);
    res.status(500).json({ error: "Could not fetch customer by GSI" });
  }
};

export const readCustomerByType = async (req, res) => {
  try {
    const { customer_type } = req.params;

    if (!customer_type) {
      return res.status(400).json({ error: "customerType is required" });
    }

    const customers = await getCustomerByType(customer_type);

    if (!customers) {
      return res.status(404).json({ error: `No customers found with this customerType: ${customer_type}` });
    }

    res.json(customers);
  } catch (error) {
    console.error("Error reading customer by Type:", error);
    res.status(500).json({ error: "Could not fetch customer by Type" });
  }
};


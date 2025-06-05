import { saveCustomer } from '../models/MainModel.js';

export const createCustomer = async (req, res) => {
  const customer = req.body;

  if (!customer.uid || !customer.customerCode) {
    return res.status(400).json({ error: 'uid and customerCode are required' });
  }

  try {
    await saveCustomer(customer);
    res.status(201).json({ message: 'Customer saved successfully', customer });
  } catch (err) {
    console.error('Error saving customer:', err);
    res.status(500).json({ error: 'Could not save customer' });
  }
};

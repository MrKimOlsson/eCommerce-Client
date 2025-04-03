import { api, handleRequest } from './serviceBase';
import { ICustomer } from '../models/customers/ICustomer';

// Get all customers
export const getCustomers = async (): Promise<ICustomer[]> => {
    return handleRequest(api.get<ICustomer[]>('customers')); // Use api instance and handleRequest
};

// Get customer by ID
export const getCustomerByID = async (id: number): Promise<ICustomer> => {
    return handleRequest(api.get<ICustomer>(`customers/${id}`)); // Use handleRequest for error handling
};

// Create a new customer
export const createCustomer = async (customer: Omit<ICustomer, 'id'>): Promise<void> => {
    await handleRequest(api.post('customers', customer)); // Directly use post method
};

// Update an existing customer
export const updateCustomer = async (id: number, customer: Omit<ICustomer, 'id'>): Promise<void> => {
    await handleRequest(api.patch(`customers/${id}`, customer)); // Use patch method for update
};

// Delete a customer
export const deleteCustomer = async (id: number): Promise<void> => {
    await handleRequest(api.delete(`customers/${id}`)); // Use delete method for deletion
};
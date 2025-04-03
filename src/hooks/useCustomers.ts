import { useState, useEffect } from 'react';
import { ICustomer } from '../models/customers/ICustomer';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

export const useCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response);
        } catch (error) {
            setError('Failed to fetch customers');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (customerData: Omit<ICustomer, 'id'>) => {
        try {
            await createCustomer(customerData);
            fetchCustomers(); // Refresh list after adding
        } catch (error) {
            console.error('Failed to create customer', error);
            throw new Error('Failed to create customer');
        }
    };

    const editCustomer = async (id: number, customerData: Omit<ICustomer, 'id'>) => {
        try {
            await updateCustomer(id, customerData);
            fetchCustomers(); // Refresh list after updating
        } catch (error) {
            console.error('Failed to update customer', error);
            throw new Error('Failed to update customer');
        }
    };

    const removeCustomer = async (id: number) => {
        try {
            await deleteCustomer(id);
            fetchCustomers(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete customer', error);
            throw new Error('Failed to delete customer');
        }
    };

    return { customers, error, addCustomer, editCustomer, removeCustomer };
};

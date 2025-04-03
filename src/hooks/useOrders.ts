import { useEffect, useState } from 'react';
import { IOrder } from '../models/orders/IOrder';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';

export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response);
        } catch (error) {
            setError('Failed to fetch orders');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const addOrder = async (orderData: Omit<IOrder, 'id'>) => {
        try {
            await createOrder(orderData);
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error('Failed to create order', error);
            throw new Error('Failed to create order');
        }
    };

    const editOrder = async (id: number, orderData: Omit<IOrder, 'id'>) => {
        try {
            await updateOrder(id, orderData);
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error('Failed to update order', error);
            throw new Error('Failed to update order');
        }
    };

    const removeOrder = async (id: number) => {
        try {
            await deleteOrder(id);
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error('Failed to delete order', error);
            throw new Error('Failed to delete order');
        }
    };

    return { orders, error, addOrder, editOrder, removeOrder };
};
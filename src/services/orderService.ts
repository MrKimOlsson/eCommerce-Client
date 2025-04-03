import { api, handleRequest } from './serviceBase';
import { IOrder } from '../models/orders/IOrder';
import { IOrderDetails } from '../models/orders/IOrderDetails';

// Get all orders
export const getOrders = async (): Promise<IOrder[]> => {
    return handleRequest(api.get<IOrder[]>('orders'));
};

// Get an order by ID
export const getOrderByID = async (id: string): Promise<IOrder> => {
    return handleRequest(api.get<IOrder>(`orders/${id}`));
};

// Create a new order
export const createOrder = async (order: Omit<IOrder, 'id'>): Promise<void> => {
    await handleRequest(api.post('orders', order));
};

// Update an existing order
export const updateOrder = async (id: number, order: Omit<IOrder, 'id'>): Promise<void> => {
    await handleRequest(api.patch(`orders/${id}`, order));
};

// Delete an order
export const deleteOrder = async (id: number): Promise<void> => {
    await handleRequest(api.delete(`orders/${id}`));
};

// Get order confirmation
export const fetchOrderConfirmation = async (sessionId: string): Promise<IOrderDetails> => {
    return handleRequest(api.get<IOrderDetails>(`order-confirmation/${sessionId}`));
  };
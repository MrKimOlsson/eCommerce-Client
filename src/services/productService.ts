import { api, handleRequest } from './serviceBase';
import { IProduct } from '../models/products/IProduct';

// Get Product by ID
export const getProductByID = async (id: string): Promise<IProduct> => {
  return handleRequest(api.get<IProduct>(`products/${id}`));
};

// Get all products
export const getProducts = async (): Promise<IProduct[]> => {
  return handleRequest(api.get<IProduct[]>(`products`));
};

// Create a new product
export const createProduct = async (product: Omit<IProduct, 'id' | 'created_at'>): Promise<void> => {
  return handleRequest(api.post('products', product));
};

// Update an existing product
export const updateProduct = async (id: number, product: Omit<IProduct, 'id' | 'created_at'>): Promise<void> => {
  return handleRequest(api.patch(`products/${id}`, product));
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  return handleRequest(api.delete(`products/${id}`));
};

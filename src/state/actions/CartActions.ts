import { ICartItem } from "../../models/cart/ICartItem";

// Define the action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Define the action interfaces
export type CartAction =
    | { type: typeof ADD_TO_CART; product: ICartItem }
    | { type: typeof REMOVE_FROM_CART; productId: number }
    | { type: typeof INCREASE_QUANTITY; productId: number }
    | { type: typeof DECREASE_QUANTITY; productId: number }
    | { type: typeof CLEAR_CART };
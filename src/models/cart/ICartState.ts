import { ICartItem } from "./ICartItem";

export interface CartState {
    items: ICartItem[];
    totalQuantity: number;  // Total quantity of all products
    totalPrice: number;     // Total price of all products
}
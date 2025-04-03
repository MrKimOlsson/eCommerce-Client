import { useContext } from 'react';
import { CartContext } from '../state/context/CartContext';

// Custom hook to use the Cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    const cartItems = context.state.items; // Access the cart items directly

    // Calculate total quantity
    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return {
        cartItems, // Provide the cart items
        dispatch: context.dispatch, // Provide the dispatch function if needed
        totalQuantity, // Return the calculated total quantity
        totalPrice, // Return the calculated total price
    };
};
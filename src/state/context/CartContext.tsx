import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import cartReducer from '../reducers/CartReducer';
import { CartAction } from '../actions/CartActions';
import { CartState } from '../../models/cart/ICartState';


// Create the Cart context
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const initialState: CartState = {
        items: JSON.parse(localStorage.getItem('cartItems')!) || [],
        totalQuantity: 0, // Default initial values
        totalPrice: 0,
    };
    

    const [state, dispatch] = useReducer(cartReducer, initialState);
    console.log("cart context state:")
    console.log(state)

    // Save cart state to local storage on state change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to use the Cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Export CartContext
export { CartContext };
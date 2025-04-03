import { CartAction, ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from '../actions/CartActions';
import { ICartItem } from '../../models/cart/ICartItem';

// Define the state structure
interface CartState {
    items: ICartItem[];
    totalQuantity: number;  // Total quantity of all products
    totalPrice: number;     // Total price of all products
}

// Initial state fetching from local storage if available
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartItems')!) || [],
    totalQuantity: 0, // Initialize total quantity
    totalPrice: 0,    // Initialize total price
};

// Function to calculate total quantity and total price
const calculateTotals = (items: ICartItem[]) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    items.forEach(item => {
        totalQuantity += item.quantity || 0; // Add quantity
        totalPrice += (item.price * (item.quantity || 1)); // Add price * quantity
    });

    return { totalQuantity, totalPrice };
};

// Create the reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
    let updatedItems;

    switch (action.type) {
        case ADD_TO_CART: {
            const existingProductIndex = state.items.findIndex(item => item.id === action.product.id);
            if (existingProductIndex !== -1) {
                // Product already exists, increase quantity
                updatedItems = state.items.map(item =>
                    item.id === action.product.id 
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // Product does not exist, add it to the cart
                updatedItems = [...state.items, { ...action.product, quantity: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Persist to local storage
            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems), // Calculate totals
            };
        }
        case REMOVE_FROM_CART: {
            const filteredItems = state.items.filter(item => item.id !== action.productId);
            localStorage.setItem('cartItems', JSON.stringify(filteredItems));
            return {
                ...state,
                items: filteredItems,
                ...calculateTotals(filteredItems), // Calculate totals
            };
        }
        case INCREASE_QUANTITY: {
            updatedItems = state.items.map(item => 
                item.id === action.productId
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems), // Calculate totals
            };
        }
        case DECREASE_QUANTITY: {
            updatedItems = state.items.map(item => 
                item.id === action.productId
                    ? { 
                        ...item, 
                        quantity: (item.quantity || 0) > 1 ? (item.quantity || 1) - 1 : 1 
                      }
                    : item
            );
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems), // Calculate totals
            };
        }
        case CLEAR_CART: {
            // Clear the cart items
            localStorage.removeItem('cartItems'); // Also clear local storage
            return {
                ...state,
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
export { initialState }; // Make sure to export initialState if needed elsewhere
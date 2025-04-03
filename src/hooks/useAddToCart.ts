import { useCart } from '../state/context/CartContext'; 
import { ICartItem } from '../models/cart/ICartItem';
import { ADD_TO_CART } from '../state/actions/CartActions';


export const useAddToCart = () => {
    const { dispatch } = useCart();

    const addToCart = (product: ICartItem) => {
        dispatch({ type: ADD_TO_CART, product }); // Dispatch the product as a cart item to the cart context
        console.log(`${product.name} has been added to your cart!`);
    };

    return { addToCart }; // Return the addToCart function for use
};
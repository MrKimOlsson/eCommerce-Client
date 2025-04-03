import { NavLink } from 'react-router';
import { useCart } from '../hooks/useCart';
import { REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from '../state/actions/CartActions';
import '../styles/pages/cartPage.scss';

export const CartPage = () => {
    const { cartItems, totalQuantity, totalPrice, dispatch } = useCart();

    const handleIncreaseQuantity = (productId: number) => {
        dispatch({ type: INCREASE_QUANTITY, productId });
    };

    const handleDecreaseQuantity = (productId: number) => {
        dispatch({ type: DECREASE_QUANTITY, productId });
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch({ type: REMOVE_FROM_CART, productId });
    };

    const handleCheckout = () => {
        window.location.href = '/checkout';
    };


    return (
        <div className="cart-page">
            <h2>Kundvagn</h2>
            {totalQuantity > 0 ? (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-page-item">
                                <img src={item.image} alt={item.name} className="cart-page-item-image" />
                                <div className="cart-page-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Kategori: {item.category}</p>
                                    <p>Beskrivning: {item.description}</p>
                                    <p>Pris: {item.price} kr</p>
                                    <p>Antal: {item.quantity}</p>
                                    <div className="cart-page-button-container">
                                        <button 
                                            className='cart-page-item-button' 
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                        <button 
                                            className='cart-page-item-button' 
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <button 
                                            className='cart-page-item-button' 
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Ta bort
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cart-page-row'>
                        <h3 className='cart-page-total-price'>Totalt: {totalPrice} kr</h3>
                        <NavLink to="/checkout">
                            <button id="btn-primary">Beställ</button>  
                        </NavLink>
                    </div>
                </div>
            ) : (
                <p>Din kundvagn är tom - Lägg till en <a href="/">produkt</a></p>
            )}
        </div>
    );
};
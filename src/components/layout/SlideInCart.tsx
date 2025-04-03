import React from 'react';
import '../../styles/layout/slideInCart.scss';
import '../../styles/globalStyles.scss';
import { useCart } from '../../state/context/CartContext';
import { NavLink } from 'react-router';

interface SlideInCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideInCart: React.FC<SlideInCartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart(); // Access the cart state and dispatch method

  const handleIncreaseQuantity = (productId: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', productId }); // Dispatch action to increase quantity
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', productId }); // Dispatch action to decrease quantity
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId }); // Dispatch action to remove item from cart
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Sum of price * quantity
  };

const totalPrice = calculateTotalPrice(); // Get the total price

  return (
    <div className={`slide-in-cart ${isOpen ? 'open' : ''}`}>
      <div className='cart-heading-container'>
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Kundvagn</h3>
      </div>
      
      {state.items.length > 0 ? (
        state.items.map((item) => (
          <div key={item.id} className='cart-item'>
            <div className='cart-item-image'>
              <img src={item.image} alt={item.name} />
            </div>
            <div>
            <h4 className='cart-item-title'>{item.name}</h4>
            <h5 className='cart-item-price'>Pris: {item.price}kr</h5>
            <p className='cart-item-quantity'>Antal: {item.quantity}st</p>

            <div className='cart-button-container'>
              <button className='cart-item-button' onClick={() => handleIncreaseQuantity(item.id)}>+</button> {/* Button to increase quantity */}
              <button className='cart-item-button' onClick={() => handleDecreaseQuantity(item.id)}>-</button> {/* Button to decrease quantity */}
              <button className='cart-item-button' onClick={() => handleRemoveFromCart(item.id)}>Ta bort</button> {/* Button to remove item */}
            </div>
            </div>
          </div>
        ))
      ) : (
        <div>Kundvagnen är tom</div> // Message when the cart is empty
      )}

      <h4 className='total-price'>Totalt: {totalPrice}kr</h4>
      <NavLink to="/cart">
        <button id='btn-primary'>Till kundvagn</button>
      </NavLink>
    </div>
  );
};

export default SlideInCart
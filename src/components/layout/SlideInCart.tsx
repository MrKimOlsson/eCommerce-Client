import React, { useEffect, useRef, } from 'react';
import '../../styles/layout/slideInCart.scss';
import '../../styles/globalStyles.scss';
import { useCart } from '../../state/context/CartContext';
import { NavLink } from 'react-router';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

interface SlideInCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideInCart: React.FC<SlideInCartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart(); // Access the cart state and dispatch method

  const cartRef = useRef<HTMLDivElement | null>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose(); // Close dropdown if clicked outside
    }
};

// Add event listener on mount
useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


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
    <div ref={cartRef} className={`slide-in-cart ${isOpen ? 'open' : ''}`}>
      <div className='cart-heading-container'>
        <button className="close-btn" onClick={onClose}><IoMdCloseCircleOutline /></button>
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
              <button id="btn-icon" onClick={() => handleIncreaseQuantity(item.id)}><IoMdAddCircleOutline /></button>
              <button id="btn-icon" onClick={() => handleDecreaseQuantity(item.id)}><IoMdRemoveCircleOutline /></button>
              <button id="btn-icon" onClick={() => handleRemoveFromCart(item.id)}><IoMdCloseCircleOutline /></button>
            </div>
            </div>
          </div>
        ))
      ) : (
        <div>Your cart is empty</div> // Message when the cart is empty
      )}

      <h4 className='total-price'>Total: ${totalPrice}</h4>
      <NavLink to="/cart">
        <button id='btn-primary'>Your cart</button>
      </NavLink>
    </div>
  );
};

export default SlideInCart
import { useState } from 'react';
import '../../styles/layout/navbar.scss';
import '../../styles/layout/slideinCart.scss';
import SlideinCart from './SlideInCart';
import { useCart } from '../../hooks/useCart';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin, FiFacebook } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { Bolt, CircleUserRound, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router';


export const Navbar: React.FC = () => {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const { totalQuantity} = useCart(); 
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { logout, user } = useAuth();

    const handleCartToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("toggle cart");
      setCartOpen(!cartOpen);
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);
  
    return (
      <nav>
           <div className='logo'>
              <NavLink to="/"><h1>QUIRK</h1></NavLink>
          </div>
        <ul>
          <li>
            <NavLink to="https://sv-se.facebook.com/">
              <FiFacebook />
            </NavLink>
          </li>
  
          <li>
            <NavLink to="https://www.instagram.com/">
              <FaInstagram />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://x.com/?lang=sv">
             <FaXTwitter />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://se.linkedin.com/">
             <FiLinkedin />
            </NavLink>
          </li>
        </ul>
      
        <ul className='right-links'>
          <li>
            
          <NavLink to="/" className='product-icon'>
              <AiOutlineProduct />
          </NavLink>
          </li>
  
          <li>
            <NavLink to="#" onClick={toggleDropdown}>
              <CircleUserRound size={16} />
            </NavLink>
            {showDropdown && (
              <div className="dropdown">
                  {/* <NavLink to="/register">Register</NavLink>
                  <NavLink to="/login">Login</NavLink> */}
                  {!user && <NavLink to="/register">Register</NavLink>}
                  {!user && <NavLink to="/login">Login</NavLink>}
                  {user && <NavLink to="/profile">Profile</NavLink>}
                  {user && (
                      <NavLink to="/" onClick={(e) => { e.preventDefault(); logout(); }}>
                          Logout
                      </NavLink>
                  )}
              </div>
            )}
          </li>

          <li>
            <NavLink to="/admin">
              <Bolt size={16} />
            </NavLink>
          </li>
  
          <li>
            <NavLink to="/" onClick={handleCartToggle}>
              <ShoppingBag size={16} />
            </NavLink>
            {totalQuantity > 0 &&
              <div className='cartItem-quantity'>{totalQuantity}</div>
            }
          
          </li>
        </ul>
        <SlideinCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </nav>
    );
  }
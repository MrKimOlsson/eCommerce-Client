import { useEffect, useRef, useState } from 'react';
import '../../styles/layout/navbar.scss';
import SlideInCart from './SlideInCart';
import { useCart } from '../../hooks/useCart';
import { AiOutlineProduct } from "react-icons/ai";
import { Bolt, CircleUserRound, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router';
import SearchBar from './SearchBar';
import Modal from '../shared/Modal';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from "react-icons/ai";

export const Navbar = () => {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const { totalQuantity } = useCart();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const { logout, user } = useAuth();
  
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleCartToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      setCartOpen(!cartOpen);
    };
  
    return (
      <nav>
        <div className='logo'>
          <NavLink to="/"><h1>QUIRK</h1></NavLink>
        </div>
        
        {/* Desktop Search Bar */}
        <div className="desktop-search">
          <motion.div
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .4 }}
              viewport={{ once: false }}
          >
            <SearchBar />
          </motion.div>
        </div>
  
        {/* Mobile Search Icon */}
        <motion.div
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .4 }}
              viewport={{ once: false }}
          >
            <div className="search-icon" onClick={() => setSearchModalOpen(true)}>
            <AiOutlineSearch size={24} />
            </div>
          </motion.div>
  
        {/* Modal for Search on Mobile */}
        <Modal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)}>
          <SearchBar />
        </Modal>
  
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          viewport={{ once: false }}
        >
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
                <div className="dropdown" ref={dropdownRef}>
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
              {totalQuantity > 0 && (
                <div className='cartItem-quantity'>{totalQuantity}</div>
            )}
          </li>
        </ul>
      </motion.div>
      <SlideInCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;

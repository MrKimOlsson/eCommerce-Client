import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globalStyles.scss'
import App from './App';
import { CartProvider } from './state/context/CartContext'; // Adjust the import path
import { ProductProvider } from './state/context/ProductContext';
import { AuthProvider } from './state/context/authContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  </StrictMode>,
);
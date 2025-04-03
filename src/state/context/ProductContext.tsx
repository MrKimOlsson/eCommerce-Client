import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { productReducer } from '../reducers/ProductReducer';
import { IProduct } from '../../models/products/IProduct';

interface ProductContextProps {
    products: IProduct[];
    error: string | null;
    loading: boolean;
    dispatch: React.Dispatch<any>; // Replace with a more specific type as needed
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(productReducer, {
        products: [],
        error: null,
        loading: false,
    });

    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
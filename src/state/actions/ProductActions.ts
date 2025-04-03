// import { IProduct } from '../../models/products/IProduct';
import { getProducts } from '../../services/productService';

// Define action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action creator for fetching products
export const fetchProducts = () => {
    return async (dispatch: React.Dispatch<any>) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        try {
            const products = await getProducts();
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
        } catch (error) {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: 'Failed to fetch products' });
        }
    };
};
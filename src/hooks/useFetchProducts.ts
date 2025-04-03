import { useEffect } from 'react';
import { useProducts } from '../state/context/ProductContext';
import { fetchProducts } from '../state/actions/ProductActions';

export const useFetchProducts = () => {
    const { dispatch } = useProducts();

    useEffect(() => {
        const fetchProductsData = async () => {
            await fetchProducts()(dispatch);
        };

        fetchProductsData();
    }, [dispatch]);
};
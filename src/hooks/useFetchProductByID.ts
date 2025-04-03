import { useEffect, useState } from 'react';
import { getProductByID } from '../services/productService';
import { IProduct } from '../models/products/IProduct';

export const useFetchProductByID = (id: string | undefined) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError("Product ID is missing.");
                setLoading(false);
                return;
            }

            setLoading(true); // Start loading
            try {
                const response = await getProductByID(id);
                setProduct(response);
            } catch (err) {
                setError('Failed to fetch product');
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false whether the fetch succeeded or failed
            }
        };

        fetchProduct();
    }, [id]);

    return { product, error, loading };
};
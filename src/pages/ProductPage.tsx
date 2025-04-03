import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useFetchProductByID } from '../hooks/useFetchProductByID'; 
import { useAddToCart } from '../hooks/useAddToCart';
import { ICartItem } from '../models/cart/ICartItem';
import '../styles/pages/productPage.scss';
import '../styles/globalStyles.scss';

export const ProductPage = () => {
    const { id } = useParams<{ id?: string }>();
    const { product, error, loading } = useFetchProductByID(id); 
    const { addToCart } = useAddToCart(); // Use the custom hook

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const actualProduct = product!;

    // Handle adding the product to the cart using the hook
    const handleAddToCart = () => {
        const cartItem: ICartItem = {
            ...actualProduct,
            quantity: 1,
        };
        addToCart(cartItem); // Call the function from the hook
    };

      // Check stock availability
      const isOutOfStock = actualProduct.stock < 1;

    return (
        <div className="product-page">
            <div className='row'>
                <div className='column'>
                    <img src={actualProduct.image} alt={actualProduct.name} />
                </div>
                <div className='column'>
                    <h1>{actualProduct.name}</h1>
                    <p>{actualProduct.description}</p>
                    <p className='price'><b>Pris: {actualProduct.price}kr</b></p>
                    {isOutOfStock ? (
                        <div className="out-of-stock-message">
                            <p>Tillfälligt slut i lagret</p>
                            <button disabled className="out-of-stock-button">Köp</button>
                        </div>
                    ) : (
                        <button id='btn-primary' onClick={handleAddToCart}>Köp</button>
                    )}
                </div>
            </div>
        </div>
    );
};
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useFetchProductByID } from '../hooks/useFetchProductByID'; 
import { useAddToCart } from '../hooks/useAddToCart';
import { ICartItem } from '../models/cart/ICartItem';
import '../styles/pages/productPage.scss';
import '../styles/globalStyles.scss';
import SimilarProducts from '../components/products/SimilarProducts';
import { motion } from 'framer-motion';


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
             <motion.div
                initial={{ opacity: 0, y: 30 }} // Starting state
                whileInView={{ opacity: 1, y: 0 }} // State when in view
                transition={{ duration: 0.5 }} // Duration of the animation
                viewport={{ once: false }} // Set to true to animate only once
                >
            <div className='responsive-row-column'>
               
                    <img className="product-image" src={actualProduct.image} alt={actualProduct.name} />
             
                <div className='column'>
                    <h1>{actualProduct.name}</h1>
                    <p>{actualProduct.description}</p>
                    <br/>
                    <p>Please note that this is a fictive website, showcasing select products for demonstration purposes. 
                        I do not sell these products; my focus is on web development. 
                        If you're interested in purchasing any of these fantastic items, I encourage you to visit <a href="https://xreart.com/">Xreart.com</a>.</p>
                    <br/>
                    <p className='price'><b>Price: ${actualProduct.price}</b></p>
                    {isOutOfStock ? (
                        <div className="out-of-stock-message">
                            <p>Out of stock</p>
                            <button disabled className="out-of-stock-button">Add to cart</button>
                        </div>
                    ) : (
                        <button id='btn-primary' onClick={handleAddToCart}>Add to cart</button>
                    )}
                </div>
            </div>
                </motion.div>
            <SimilarProducts currentCategory={actualProduct.category} />
        </div>
    );
};
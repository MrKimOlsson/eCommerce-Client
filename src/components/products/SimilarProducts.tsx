import { useState, useEffect } from 'react';
import { IProduct } from '../../models/products/IProduct';
import { ProductCard } from './ProductCard';
import { useFetchProducts } from '../../hooks/useFetchProducts'; // Adjust import based on your structure
import '../../styles/products/similarProducts.scss';
import { motion } from 'framer-motion';

interface SimilarProductsProps {
    currentCategory: string;
}

const SimilarProducts = ({ currentCategory }: SimilarProductsProps) => {
    const products = useFetchProducts(); // Get products from useFetchProducts

    const [itemsToShow, setItemsToShow] = useState<number>(4); // Default to 4 items

    // Responsive similar products amount
    useEffect(() => {
        const updateItemsToShow = () => {
            const width = window.innerWidth;
            if (width > 1300) {
                setItemsToShow(4);
            } else if (width > 1000) {
                setItemsToShow(3);
            } else if (width > 600) {
                setItemsToShow(2);
            } else {
                setItemsToShow(1);
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow); // Update value on resize

        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    // Split current category into keywords
    const currentKeywords = currentCategory.split(',').map(keyword => keyword.trim());

    // Filter products based on matching keywords
    const similarProducts = products.filter((product: IProduct) => {
        const productKeywords = product.category.split(',').map(keyword => keyword.trim());
        return currentKeywords.some(keyword => productKeywords.includes(keyword));
    });

    // Limit to the items to show based on responsive behavior
    const displayedProducts = similarProducts.slice(0, itemsToShow);

    return (
        <section className="section border-top">
            {displayedProducts.length > 0 ? (
                <div className="row">
                   {displayedProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p>No similar products found.</p>
            )}
        </section>
    );
};

export default SimilarProducts;

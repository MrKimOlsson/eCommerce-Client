import { ProductCard } from './ProductCard';
import { useProducts } from '../../state/context/ProductContext';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import '../../styles/products/products.scss';
import { motion } from 'framer-motion';


export const ProductList = () => {
    const { products, error, loading } = useProducts();

    console.log(products)

    useFetchProducts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='product-list'>
            {products.map(product => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: 0}}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );
};
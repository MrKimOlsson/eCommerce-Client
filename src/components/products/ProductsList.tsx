import { ProductCard } from './ProductCard';
import { useProducts } from '../../state/context/ProductContext';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import '../../styles/products/products.scss';

export const ProductList = () => {
    const { products, error, loading } = useProducts();

    console.log(products)

    // Use hook to fetch products
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
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

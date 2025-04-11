import '../../styles/products/products.scss';
import { IProduct } from '../../models/products/IProduct';
import { Link } from 'react-router';

interface ProductCardProps {
    product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className='product-card'>
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className='product-card-image' />
                <div className='row'>
                    <div className='column'>
                        <h2 className='product-title'>{product.name}</h2>
                        <h3 className='product-price'>Price: ${product.price}</h3>
                    </div>
                    <button id="btn-primary">Buy</button>
                </div>
            </Link>
        </div>
    );
};
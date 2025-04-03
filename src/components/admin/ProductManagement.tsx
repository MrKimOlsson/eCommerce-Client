import { useEffect, useRef, useState } from 'react';
import { IProduct } from '../../models/products/IProduct';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import Modal from '../shared/Modal';
import ProductForm from '../../components/forms/ProductForm';
import '../../styles/pages/admin.scss';
import { CirclePlus, Ellipsis } from 'lucide-react';

const ProductManagement = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleActionsId, setVisibleActionsId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const actionRef = useRef<HTMLDivElement | null>(null);

    //____________________________________________________Handle clicks outside of the action buttons____________________________________________________
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
  
            if (
                actionRef.current &&
                !actionRef.current.contains(target) &&
                !(target instanceof HTMLElement && target.closest('.action-buttons'))
            ) {
                setVisibleActionsId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    //____________________________________________________Fetch products____________________________________________________
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    //____________________________________________________Form submit____________________________________________________
    const handleSubmit = async (formData: Omit<IProduct, 'id' | 'created_at'>) => {
        try {
            if (isEditing && selectedProduct) {
                await updateProduct(selectedProduct.id, formData);
                alert('Product updated successfully');
            } else {
                await createProduct(formData);
                alert('Product added successfully');
            }
            closeModal();
            fetchProducts();
        } catch (error) {
            setError('Failed to save product');
        }
    };

    //____________________________________________________Product actions____________________________________________________
    const handleAddProduct = () => {
      setSelectedProduct(null);
      setIsEditing(false);
      openModal();
    };

    const handleEdit = (product: IProduct) => {
        console.log('Edit clicked for product:', product);
        setSelectedProduct(product);
        setIsEditing(true);
        closeActions();
        openModal();
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            setError('Failed to delete product');
        }
    };

    //____________________________________________________Action buttons____________________________________________________
    const handleActionsToggle = (id: number) => {
        setVisibleActionsId(visibleActionsId === id ? null : id); // Toggle dropdown
    };

    const closeActions = () => {
        setVisibleActionsId(null); // Close actions dropdown
    };

    //____________________________________________________Modal____________________________________________________
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setIsEditing(false);
        closeActions();
    };

    return (
    <div className='admin-section'>
        {error && <div>{error}</div>}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ProductForm 
                onSubmit={handleSubmit} 
                initialData={isEditing && selectedProduct ? selectedProduct : undefined}
                isEditing={isEditing} 
            />
        </Modal>

        <section className='list-section'>
            <h2 className='admin-heading'>Produkt administration</h2>
            <div className='list-heading'>
                <p>Bild</p>
                <p>Produkt ID</p>
                <p>Namn</p>
                <p>Kategori</p>
                <p>Pris</p>
                <p>Lager</p>
                <div className='button-container'>
                    <button className='add-button' onClick={handleAddProduct}>
                        <CirclePlus size={16} />
                    </button>
                </div>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>

                        {/* Product list row */}
                        <div className='row'>
                            <img src={product.image} alt={product.name} className="productManagement-image" />
                            <p>{product.id}</p>
                            <p>{product.name}</p>
                            <p>{product.category}</p>
                            <p>{product.price} kr</p>
                            <p>{product.stock}</p>

                            {/* Action buttons */}
                            <div className='actions' ref={actionRef}>
                                <span 
                                    className='three-dots' 
                                    onClick={() => handleActionsToggle(product.id)}
                                >
                                <Ellipsis size="16px" />
                                </span>
                                {visibleActionsId === product.id && (
                                  <div className='action-buttons'>
                                      <button 
                                          className='top-action-button action-button'
                                          onClick={(event) => { 
                                              event.stopPropagation();
                                              handleEdit(product);
                                          }} 
                                      >
                                          Edit
                                      </button>
                                      <button 
                                          className='bottom-action-button action-button'
                                          onClick={(event) => {
                                              event.stopPropagation();
                                              handleDelete(product.id!);
                                              closeActions();
                                          }}
                                      >
                                          Delete
                                      </button>
                                  </div>
                              )}
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </section>
    </div>
);
};


export default ProductManagement;

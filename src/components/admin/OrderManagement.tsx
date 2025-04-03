import { useEffect, useRef, useState } from 'react';
import { IOrder } from '../../models/orders/IOrder';
import OrderForm from '../../components/forms/OrderForm';
import { useOrders } from '../../hooks/useOrders';
import Modal from '../shared/Modal';
import '../../styles/pages/admin.scss';
import { CirclePlus, Ellipsis } from 'lucide-react';

const OrderManagement = () => {
    const { orders, error, addOrder, editOrder, removeOrder } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleActionsId, setVisibleActionsId] = useState<number | null>(null);
    const actionRef = useRef<HTMLDivElement | null>(null);

    console.log(orders)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
  
            // Check if the click is outside the action buttons
            if (
                actionRef.current &&
                !actionRef.current.contains(target) &&
                !(target instanceof HTMLElement && target.closest('.action-buttons'))
            ) {
                setVisibleActionsId(null); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (formData: Omit<IOrder, 'id'>) => {
        if (isEditing && selectedOrder) {
            await editOrder(selectedOrder.id!, formData);
            alert('Order updated successfully');
            resetSelection();
        } else {
            await addOrder(formData);
            alert('Order created successfully');
        }
        closeModal(); // Close the modal after submission
    };

    const handleEdit = (order: IOrder) => {
        setSelectedOrder(order);
        setIsEditing(true);
        closeActions();
        openModal(); // Open modal when editing an order
    };

    const handleDelete = async (id: number) => {
        await removeOrder(id);
        alert('Order deleted successfully');
    };

    // Action buttons

    const handleActionsToggle = (id: number | null) => {
        setVisibleActionsId(visibleActionsId === id ? null : id);
    };
    
    const closeActions = () => {
        setVisibleActionsId(null); // Close actions dropdown
    };

    const resetSelection = () => {
        setIsEditing(false);
        setSelectedOrder(null);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddOrder = () => {
        resetSelection();
        openModal();
    };

    return (
        <div className='admin-section'>
            {error && <div>{error}</div>}
    
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <OrderForm 
                    onSubmit={handleSubmit} 
                    initialData={isEditing && selectedOrder ? { 
                        customer_id: selectedOrder.customer_id, 
                        payment_status: selectedOrder.payment_status, 
                        payment_id: selectedOrder.payment_id ?? null,
                        order_status: selectedOrder.order_status,
                        order_items: selectedOrder.order_items, 
                    } : undefined}
                    isEditing={isEditing} 
                />
            </Modal>
    
            <section className='list-section'>
                <h2 className='admin-heading'>Order administration</h2>
                <div className='list-heading'>
                    <p>Beställnings ID</p>
                    <p>Kund ID</p>
                    <p>Betalning</p>
                    <p>Beställning</p>
                    <p>Kund</p>
                    <p>Adress</p>
                    <p>Telefon</p>
                    <p>Totalkostnad</p>
                    <div className='button-container'>
                        <button className='add-button' onClick={handleAddOrder}>
                            <CirclePlus size={16} />
                        </button>   
                    </div>
                </div>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <div className='row'>
                                <p>{order.id}</p>
                                <p>{order.customer_id}</p>
                                <p>{order.payment_status}</p>
                                <p>{order.order_status}</p>
                                <p>{order.customer_firstname} {order.customer_lastname}</p>
                                <p>{order.customer_street_address}, {order.customer_postal_code}, {order.customer_city}, {order.customer_country}</p>
                                <p>{order.customer_phone}</p>
                                <p>{order.total_price}</p>
                                
                                <div className='actions' ref={actionRef}>
                                    <span 
                                        className='three-dots' 
                                        onClick={() => handleActionsToggle(order.id)}
                                    >
                                        <Ellipsis size="16px" />
                                    </span>

                                    {visibleActionsId === order.id && (
                                        <div className='action-buttons'>
                                            <button 
                                                className='top-action-button action-button'
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleEdit(order); // Open modal for editing
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className='bottom-action-button action-button'
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDelete(order.id!); // Delete the order
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
}
export default OrderManagement;
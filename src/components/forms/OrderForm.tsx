import React, { useState, useEffect } from 'react';
import { IOrder } from '../../models/orders/IOrder';
import { ICartItem } from '../../models/cart/ICartItem'; // Make sure to import the ICartItem
import { useCart } from '../../state/context/CartContext'; // Import the useCart hook
import '../../styles/forms/form.scss';

interface OrderFormProps {
    onSubmit: (order: Omit<IOrder, 'id'>) => void;
    initialData?: Omit<IOrder, 'id'>; 
    isEditing: boolean; 
}

const OrderForm = (props: OrderFormProps) => {
    const { onSubmit, initialData, isEditing } = props;
    const { state } = useCart(); // Get the state from the useCart hook
    const { items: cartItems } = state; // Destructure items from state

    const [formData, setFormData] = useState<Omit<IOrder, 'id'>>({
        customer_id: 0,
        payment_status: '',
        payment_id: '',
        order_status: '',
        order_items: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Map cartItems to order_items structure
            const updatedOrderItems = cartItems.map((item: ICartItem) => ({
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
            }));
            setFormData(prevState => ({
                ...prevState,
                order_items: updatedOrderItems,
            }));
        }
    }, [initialData, cartItems]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // Call the onSubmit function with the form data
        setFormData({ 
            customer_id: 0,
            payment_status: '',
            payment_id: null,
            order_status: '',
            order_items: [],
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Order' : 'Create Order'}</h2> {/* Dynamic Heading */}
            
            <input
                type="text"
                placeholder="Customer ID"
                value={formData.customer_id}
                onChange={(e) => setFormData({ ...formData, customer_id: +e.target.value })}
                required
            />
    
            <input
                type="text"
                placeholder="Payment Status"
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Order Status"
                value={formData.order_status}
                onChange={(e) => setFormData({ ...formData, order_status: e.target.value })}
                required
            />
                        
            <button className="form-button" type="submit">{isEditing ? 'Update Order' : 'Create Order'}</button>
        </form>
    );
};

export default OrderForm;
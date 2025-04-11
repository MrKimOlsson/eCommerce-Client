import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ICustomer } from "../models/customers/ICustomer";
import { BASE_URL } from "../services/serviceBase";
import { IOrderDetails } from "../models/orders/IOrderDetails";

export const ProfilePage = () => {
    const context = useAuth();
    const [customerData, setCustomerData] = useState<ICustomer | null>(null);
    const [orderDetails, setOrderDetails] = useState<IOrderDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ordersLoading, setOrdersLoading] = useState(true);


    useEffect(() => {

        // Fetch customer by user id
        const fetchCustomerData = async () => {
            if (context.user) {
                try {
                    const response = await axios.get<ICustomer>(`${BASE_URL}/customers/user/${context.user.id}`);
                    setCustomerData(response.data);
                    
                    if (response.data && response.data.id) {
                        fetchOrders(response.data.id);
                    }
                } catch (err) {
                    console.error('Error fetching customer data:', err);
                    setError('Could not fetch customer data.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
    
        fetchCustomerData();
    }, [context.user]);

    useEffect(() => {
        console.log("Updated Orders:", orderDetails);
    }, [orderDetails]);


// Fetch orders by customer id
  const fetchOrders = async (customerId: number) => {
    setOrdersLoading(true);
    try {
        const response = await axios.get<IOrderDetails[]>(`${BASE_URL}/orders/customer/${customerId}/orders`);
        if (Array.isArray(response.data)) {
            setOrderDetails(response.data);
        } else if (typeof response.data === 'object' && response.data !== null) {
            setOrderDetails([response.data]);
        } else {
            setOrderDetails([]);
        }
    } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Could not fetch orders.');
        setOrderDetails([]);
    } finally {
        setOrdersLoading(false);
    }
};

    return (
        <div className="wrapper">
            <h2>Profile</h2>
    
            {loading && <p>Loading...</p>}
    
            {context.user ? (
                <div>
                    <p>Logged in as: {context.user.username}</p>
                    <p>ID: {context.user.id}</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    {/* User / Customer data */}
                    {customerData ? (
                        <div>
                            <h3>Customer Details</h3>
                            <p>First Name: {customerData.firstname}</p>
                            <p>Last Name: {customerData.lastname}</p>
                            <p>Email: {customerData.email}</p>
                            <p>Phone: {customerData.phone}</p>
                            <p>Address: {customerData.street_address}, {customerData.city}, {customerData.country}</p>
                        </div>
                    ) : (
                        <p>No customer data found.</p>
                    )}

                    {/* The customers order list */}
                    <h3>Orders</h3>
                    {orderDetails.length > 0 ? (
                        <ul>
                            {orderDetails.map(order => (
                                <li key={order.id}>
                                    <p>Order ID: {order.id}</p>
                                    <p>Total Price: {order.total_price} SEK</p>
                                    <p>Status: {order.order_status}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found for this customer.</p>
                    )}
                </div>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default ProfilePage;
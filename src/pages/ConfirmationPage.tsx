import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { IOrderDetails } from "../models/orders/IOrderDetails";
import '../styles/pages/confirmationPage.scss';
import { useCart } from "../hooks/useCart";
import { CLEAR_CART } from "../state/actions/CartActions";

export const ConfirmationPage = () => {
  const { dispatch } = useCart(); 
  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

  console.log("session id:", sessionId);

  useEffect(() => {

    dispatch({ type: CLEAR_CART });
    localStorage.removeItem('cartItems');
    localStorage.removeItem('customerData');

    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://e-commerce-api-rouge.vercel.app/orders/payment/${sessionId}`);
        setOrderDetails(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError('Order not found');
        } else {
          setError('Error fetching order details');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    

    fetchOrderDetails();
  }, [sessionId]);

  
  if (loading) return <div>Loading order details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetails) return <div>No order details found</div>;

  return (
    <section className='list-section'>

      <h2 className='list-top-heading'>Thank you for your order!</h2>

      <h2 className='list-section-heading'>Your order details</h2>
      <div className='list-heading'>
        <p>Order ID</p>
        <p>Customer ID</p>
        <p>Status</p>
        <p>Date</p>
      </div>

      <div className="list-row">
        <p>{orderDetails.id}</p>
        <p>{orderDetails.customer_id}</p>
        <p>{orderDetails.order_status}</p>
        <p>{new Date(orderDetails.created_at).toLocaleString()}</p>
      </div>


      <h2 className='list-section-heading'>Leverans</h2>

      <div className='list-heading'>
        <p>Name</p>
        <p>Address</p>
        <p>Phone</p>
        <p>Email</p>
      </div>

      <div className="list-row">
        <p>{orderDetails.customer_firstname} {orderDetails.customer_lastname}</p>
        <p>{orderDetails.customer_street_address} {orderDetails.customer_postal_code} {orderDetails.customer_city} {orderDetails.customer_country}</p>
        <p>{orderDetails.customer_phone}</p>
        <p>{orderDetails.customer_email}</p>
      </div>
     
      <h2 className='list-section-heading'>Produkter:</h2>

      <div className='list-heading'>
        <p>Product</p>
        <p>Amount</p>
        <p>Price</p>
        <p>ID</p>
      </div>

        {orderDetails.order_items.map((item, index) => (
      <div className="list-row" key={index}>
          <ul>
              <li>
                  {item.product_name}
              </li>
              <li>
                  {item.quantity}
              </li>
              <li>
                  {item.unit_price}
              </li>
              <li>
                  {item.product_id}
              </li>
          </ul>
      </div>
        ))}

      <div className="total-price">
        <h3>Total:</h3>
        <h3>${orderDetails.total_price}</h3>
      </div>
      
    </section>
  );
};
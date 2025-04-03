import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import { useCart } from '../hooks/useCart'; 
import { ICustomerCreate } from '../models/customers/ICustomer';
import CheckoutForm from '../components/forms/CheckoutForm';
import '../styles/pages/checkoutPage.scss';

const stripePromise = loadStripe('pk_test_51R4HXqPMclwytudJNfxuHUtHiLbKim9rsM2DyRarkL4IDLKtsx7ElnSsaZL9SEBkyrmJEcwtF8agWN2towZYcXF500dKMsFlUG');

function CheckoutPage() {
  const { cartItems } = useCart();

  const initialCustomerData = (() => {
    const storedData = localStorage.getItem('customerData');
    return storedData ? JSON.parse(storedData) : {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      street_address: '',
      postal_code: '',
      city: '',
      country: '',
      gdpr: false,
    };
  })();
  
  const [customerData, setCustomerData] = useState(initialCustomerData);
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Persist customerData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify(customerData));
  }, [customerData]);

  // Function to fetch client secret
  const fetchClientSecret = async (orderId: number) => {
    console.log("Fetching client secret for Order ID:", orderId);
    try {

      const response = await fetch("https://e-commerce-api-rouge.vercel.app/stripe/create-checkout-session-embedded", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          orderId: orderId,
          customerEmail: customerData.email
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.clientSecret) {
        throw new Error("Received no client secret from the server.");
      }
      
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  };

  const handleCustomerSubmit = async (newCustomerData: Omit<ICustomerCreate, 'id'>) => {
    setCustomerData(newCustomerData); // Update customer data state

    try {
        const emailCheckResponse = await fetch(
            `https://e-commerce-api-rouge.vercel.app/customers/email/${encodeURIComponent(newCustomerData.email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        let customerId; // Variable to store customer ID

        // If the response is OK, the customer exists
        if (emailCheckResponse.ok) {
            const existingCustomer = await emailCheckResponse.json();
            if (existingCustomer && existingCustomer.id) {
                customerId = existingCustomer.id;
                console.log("Existing customer found:", existingCustomer);
            }
        } 
        // Handle case where customer is not found
        else {
            const errorData = await emailCheckResponse.json();

            // Check for custom message response for 'not found' case
            if (errorData.message === "Customer not found") {
                console.log("Customer not found; creating new customer.");
                
                const createCustomerResponse = await fetch('https://e-commerce-api-rouge.vercel.app/customers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCustomerData),
                });

                if (createCustomerResponse.ok) {
                    const newCustomer = await createCustomerResponse.json();
                    customerId = newCustomer.id;
                    console.log("New customer created:", newCustomer);
                } else {
                    const createErrorData = await createCustomerResponse.json();
                    throw new Error(`Failed to create customer: ${createErrorData.message || 'Unknown error'}`);
                }
            } else {
                // Handle other errors
                console.error(`Failed to check customer email: ${errorData.message || 'Unknown error'}`);
                return;
            }
        }

        // If customerId is found or created, proceed to create the order
        if (customerId) {
            const orderResponse = await fetch('https://e-commerce-api-rouge.vercel.app/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_id: customerId,
                    order_items: cartItems.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        unit_price: item.price,
                    })),
                    order_status: 'Pending',
                    payment_status: '',
                    payment_id: '',
                }),
            });

            if (!orderResponse.ok) {
                const orderErrorData = await orderResponse.json();
                throw new Error(`Failed to create order: ${orderErrorData.message || 'Unknown error'}`);
            }

            const orderData = await orderResponse.json();
            const secret = await fetchClientSecret(orderData.id);
            setClientSecret(secret);
            setStep(2);
        }
    } catch (error) {
        console.error('Error during submission:', error);
        alert('An error occurred during checkout. Please try again.');
    }
};

if (cartItems.length === 0) {
  return <div>Varukorgen måste innehålla varor för att kunna gå vidare med betalprocessen.</div>;
}

return (
  <div id="checkout">
    <h1>Kassa</h1>

    {step === 1 ? ( // Customer information step
      <div className='checkout-step'>
        <h3>Steg 1 - Leverans uppgifter</h3>
        <CheckoutForm
          onSubmit={handleCustomerSubmit} 
          isEditing={false} 
          initialData={customerData}
          />
        
        

      </div>
    ) : ( // Payment step
      <div className="checkout-step">
        <h3>Steg 2 - Betalning</h3>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
          >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )}
  </div>
);
}

export default CheckoutPage; 


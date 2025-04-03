import { useEffect, useState } from 'react';
import { IOrderDetails } from '../models/orders/IOrderDetails';
import { fetchOrderConfirmation } from '../services/orderService';
import { AxiosError } from 'axios';

export const useOrderConfirmation = (sessionId: string | null) => {
  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchOrderConfirmation(sessionId);
        setOrderDetails(data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
          setError('Order not found');
        } else {
          setError('Error fetching order details');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  return { orderDetails, loading, error };
};
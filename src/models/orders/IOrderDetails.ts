export interface IOrderDetails {
    id: number;
    customer_id: number;
    total_price: number;
    payment_status: string;
    payment_id: string;
    order_status: string;
    created_at: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    customer_password: string;
    customer_phone: string;
    customer_street_address: string;
    customer_postal_code: string;
    customer_city: string;
    customer_country: string;
    order_items: {
      id: number;
      product_id: number;
      product_name: string;
      quantity: number;
      unit_price: number;
    }[];
  }
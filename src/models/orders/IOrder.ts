import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number;
    customer_id: number;
    payment_status: string;
    payment_id?: string | null;
    order_status: string;
    order_items: IOrderItem[];

    created_at?: string;
    customer_city?: string;
    customer_country?: string;
    customer_email?:string;
    customer_firstname?: string;
    customer_lastname?: string;
    customer_phone?: string;
    customer_postal_code?: string;
    customer_street_address?: string;
    customer_created_at?: string;
    total_price?: number;
}

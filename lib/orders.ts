import { supabase } from './auth';

export interface Order {
  id: string;
  user_id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address: {
    address: string;
    city: string;
    country: string;
    postal_code: string;
  };
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export async function getOrders(): Promise<Order[]> {
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return orders;
}

export async function createOrder(
  order: Omit<Order, 'id' | 'created_at' | 'updated_at'> & { items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[] }
) {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: order.user_id,
      status: order.status,
      total: order.total,
      shipping_address: order.shipping_address,
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(
      order.items.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }))
    );

  if (itemsError) throw itemsError;

  return orderData;
}
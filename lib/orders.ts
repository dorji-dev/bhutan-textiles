import { supabase } from './auth';

export interface Order {
  id: string;
  user_id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address: {
    full_name: string;
    email: string;
    phone: string;
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
  product?: {
    name: string;
    images: string[];
  };
}

export async function getOrders(): Promise<Order[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items (
        *,
        product:products (
          name,
          product_images (url)
        )
      )
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return orders.map(order => ({
    ...order,
    items: order.items.map((item: any) => ({
      ...item,
      product: item.product ? {
        ...item.product,
        images: item.product.product_images.map((img: any) => img.url)
      } : null
    }))
  }));
}

export async function createOrder(
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  },
  cartItems: any[]
) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.quantity * item.product.price);
  }, 0);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: session.user.id,
      status: 'processing',
      total,
      shipping_address: {
        full_name: shippingInfo.fullName,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        country: shippingInfo.country,
        postal_code: shippingInfo.postalCode,
      },
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Clear cart
  const { error: clearCartError } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', session.user.id);

  if (clearCartError) throw clearCartError;

  return order;
}
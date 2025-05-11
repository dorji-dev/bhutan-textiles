import { supabase } from './auth';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: {
    name: string;
    price: number;
    images: string[];
  };
}

export async function getCartItems(): Promise<CartItem[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products (
        name,
        price,
        product_images (url)
      )
    `)
    .eq('user_id', session.user.id);

  if (error) throw error;

  return cartItems.map(item => ({
    ...item,
    product: {
      ...item.product,
      images: item.product.product_images.map((img: any) => img.url)
    }
  }));
}

export async function addToCart(productId: string, quantity: number = 1) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('product_id', productId)
    .single();

  if (existingItem) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert([{
        user_id: session.user.id,
        product_id: productId,
        quantity
      }]);

    if (error) throw error;
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  if (quantity <= 0) {
    return removeFromCart(itemId);
  }

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .eq('user_id', session.user.id);

  if (error) throw error;
}

export async function removeFromCart(itemId: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .eq('user_id', session.user.id);

  if (error) throw error;
}

export async function clearCart() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', session.user.id);

  if (error) throw error;
}
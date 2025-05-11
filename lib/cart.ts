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
  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products (
        name,
        price,
        product_images (url)
      )
    `);

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
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
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
        product_id: productId,
        quantity
      }]);

    if (error) throw error;
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  if (quantity <= 0) {
    return removeFromCart(itemId);
  }

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId);

  if (error) throw error;
}

export async function removeFromCart(itemId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
}

export async function clearCart() {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .neq('id', '');

  if (error) throw error;
}
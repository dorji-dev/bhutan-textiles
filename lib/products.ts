import { supabase } from './auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'textiles' | 'paintings';
  stock: number;
  status: 'active' | 'inactive';
  artisan_id: string;
  created_at: string;
  updated_at: string;
  images: string[];
}

export async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (url)
    `)
    .eq('status', 'active');

  if (error) throw error;

  return products.map(product => ({
    ...product,
    images: product.product_images.map((img: any) => img.url)
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (url)
    `)
    .eq('id', id)
    .single();

  if (error) return null;

  return {
    ...product,
    images: product.product_images.map((img: any) => img.url)
  };
}

export async function createProduct(
  product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'images'> & { images: string[] }
) {
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
      artisan_id: product.artisan_id,
    }])
    .select()
    .single();

  if (productError) throw productError;

  if (product.images.length > 0) {
    const { error: imagesError } = await supabase
      .from('product_images')
      .insert(
        product.images.map(url => ({
          product_id: productData.id,
          url,
        }))
      );

    if (imagesError) throw imagesError;
  }

  return productData;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at' | 'images'>> & { images?: string[] }
) {
  const { error: productError } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id);

  if (productError) throw productError;

  if (updates.images) {
    // Delete existing images
    await supabase
      .from('product_images')
      .delete()
      .eq('product_id', id);

    // Insert new images
    const { error: imagesError } = await supabase
      .from('product_images')
      .insert(
        updates.images.map(url => ({
          product_id: id,
          url,
        }))
      );

    if (imagesError) throw imagesError;
  }
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
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
    .order('created_at', { ascending: false });

  if (error) throw error;

  return products.map(product => ({
    ...product,
    images: product.product_images?.map((img: any) => img.url) || []
  }));
}

export async function createProduct(
  product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'artisan_id' | 'images'> & { images: string[] }
) {
  // First create the product
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
    }])
    .select()
    .single();

  if (productError) throw productError;

  // Then add the images
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
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at' | 'artisan_id'>> & { images?: string[] }
) {
  // Update product details
  const { error: productError } = await supabase
    .from('products')
    .update({
      name: updates.name,
      description: updates.description,
      price: updates.price,
      category: updates.category,
      stock: updates.stock,
      status: updates.status,
    })
    .eq('id', id);

  if (productError) throw productError;

  // Update images if provided
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
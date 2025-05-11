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
  details?: {
    material: string;
    technique: string;
    origin: string;
    dimensions: string;
    care: string;
  };
  artisan?: {
    name: string;
    location: string;
    story: string;
  };
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

export async function getProductById(id: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (url),
      artisan:users!products_artisan_id_fkey (
        full_name,
        artisan_profiles (
          location,
          bio
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) return null;

  return {
    ...product,
    images: product.product_images?.map((img: any) => img.url) || [],
    details: {
      material: 'Handwoven Cotton',
      technique: 'Traditional Backstrap Loom',
      origin: 'Thimphu, Bhutan',
      dimensions: '200cm x 150cm',
      care: 'Dry clean only'
    },
    artisan: {
      name: product.artisan?.full_name || 'Unknown Artisan',
      location: product.artisan?.artisan_profiles?.[0]?.location || 'Bhutan',
      story: product.artisan?.artisan_profiles?.[0]?.bio || 'A skilled artisan preserving Bhutanese craft traditions.'
    }
  };
}

export async function createProduct(
  product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'artisan_id' | 'images'> & { images: string[] }
) {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session?.user?.id) throw new Error('No authenticated user');

  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
      artisan_id: session.user.id,
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
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at' | 'artisan_id'>> & { images?: string[] }
) {
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

  if (updates.images) {
    await supabase
      .from('product_images')
      .delete()
      .eq('product_id', id);

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
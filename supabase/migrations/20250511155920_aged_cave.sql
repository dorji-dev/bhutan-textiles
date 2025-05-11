/*
  # Update product RLS policies for public access

  1. Changes
    - Drop existing product policies
    - Create new policies that allow public read access
    - Maintain existing security for product management
  
  2. Security
    - Allow anyone to view products
    - Keep artisan-only access for managing products
*/

-- Drop existing product policies
DROP POLICY IF EXISTS "Public read access for active products" ON products;
DROP POLICY IF EXISTS "Artisans can create their own products" ON products;
DROP POLICY IF EXISTS "Artisans can update their own products" ON products;
DROP POLICY IF EXISTS "Artisans can delete their own products" ON products;

-- Create new product policies
CREATE POLICY "Allow public read access for products"
  ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Artisans can create their own products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = artisan_id);

CREATE POLICY "Artisans can update their own products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = artisan_id);

CREATE POLICY "Artisans can delete their own products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = artisan_id);

-- Update product images policies for public access
DROP POLICY IF EXISTS "Enable read access for product images" ON product_images;

CREATE POLICY "Allow public read access for product images"
  ON product_images
  FOR SELECT
  USING (true);
/*
  # Fix RLS policies to prevent infinite recursion

  1. Changes
    - Simplify user policies to prevent recursion
    - Update product policies to ensure proper access control
    - Add missing policies for product images

  2. Security
    - Maintains data security while preventing infinite loops
    - Ensures artisans can only manage their own products
    - Allows authenticated users to view active products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read any user data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Create simplified user policies
CREATE POLICY "Enable read access for authenticated users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Update product policies
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Artisans can create products" ON products;
DROP POLICY IF EXISTS "Artisans can update their own products" ON products;
DROP POLICY IF EXISTS "Artisans can delete their own products" ON products;

-- Create new product policies
CREATE POLICY "Enable read access for active products"
  ON products
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Enable insert for artisans"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = artisan_id);

CREATE POLICY "Enable update for artisan's own products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = artisan_id);

CREATE POLICY "Enable delete for artisan's own products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = artisan_id);

-- Update product images policies
DROP POLICY IF EXISTS "Anyone can view product images" ON product_images;
DROP POLICY IF EXISTS "Artisans can manage their product images" ON product_images;

CREATE POLICY "Enable read access for product images"
  ON product_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for product owner"
  ON product_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.artisan_id = auth.uid()
    )
  );

CREATE POLICY "Enable delete for product owner"
  ON product_images
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.artisan_id = auth.uid()
    )
  );
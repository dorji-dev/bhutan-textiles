/*
  # Update products RLS policies

  1. Changes
    - Drop existing product policies
    - Create new policies that properly handle product creation and management
  
  2. Security
    - Ensure artisans can create and manage their own products
    - Maintain public read access for active products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Artisans can manage their own products" ON products;

-- Create new policies
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Artisans can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'artisan'
    )
  );

CREATE POLICY "Artisans can update their own products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (artisan_id = auth.uid())
  WITH CHECK (artisan_id = auth.uid());

CREATE POLICY "Artisans can delete their own products"
  ON products
  FOR DELETE
  TO authenticated
  USING (artisan_id = auth.uid());
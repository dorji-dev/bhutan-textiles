/*
  # Fix RLS policies for products

  1. Changes
    - Simplify product policies to prevent recursion
    - Add public read access for active products
    - Allow artisans to manage their own products
    - Remove complex policy conditions

  2. Security
    - Maintain data integrity
    - Ensure proper access control
    - Prevent infinite recursion
*/

-- Drop existing product policies
DROP POLICY IF EXISTS "Enable read access for active products" ON products;
DROP POLICY IF EXISTS "Enable insert for artisans" ON products;
DROP POLICY IF EXISTS "Enable update for artisan's own products" ON products;
DROP POLICY IF EXISTS "Enable delete for artisan's own products" ON products;

-- Create simplified product policies
CREATE POLICY "Public read access for active products"
  ON products
  FOR SELECT
  USING (status = 'active' OR auth.uid() = artisan_id);

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
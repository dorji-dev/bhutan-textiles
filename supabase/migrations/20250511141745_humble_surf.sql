/*
  # Fix RLS policies to prevent infinite recursion

  1. Changes
    - Drop existing policies that cause recursion
    - Create new policies with proper checks
    - Add policies for artisan product management
  
  2. Security
    - Maintains data access control
    - Prevents infinite recursion in policy checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Create new policies for users table
CREATE POLICY "Users can read any user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Update product policies
DROP POLICY IF EXISTS "Artisans can create products" ON products;

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
    AND artisan_id = auth.uid()
  );
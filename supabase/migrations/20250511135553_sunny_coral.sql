/*
  # Update users table policies

  1. Changes
    - Add policy to allow users to insert their own data
    - Add policy to allow users to update their own data
    - Add policy to allow artisans to be visible to authenticated users

  2. Security
    - Maintains existing RLS
    - Adds more granular control over user data access
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users can read their own data" ON users;

-- Create new policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'artisan'
  );

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
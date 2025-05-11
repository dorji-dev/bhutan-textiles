/*
  # Add artisan profiles table

  1. New Tables
    - `artisan_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `specialty` (text)
      - `experience_years` (integer)
      - `bio` (text)
      - `location` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for viewing and managing profiles
*/

CREATE TABLE artisan_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  specialty text NOT NULL,
  experience_years integer NOT NULL CHECK (experience_years >= 0),
  bio text,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE artisan_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view artisan profiles"
  ON artisan_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artisans can manage their own profile"
  ON artisan_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_artisan_profiles_updated_at
  BEFORE UPDATE ON artisan_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' AND
  auth.role() = 'authenticated'
);

-- Allow public access to view product images
CREATE POLICY "Public access to view product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Allow artisans to delete their own product images
CREATE POLICY "Artisans can delete their product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
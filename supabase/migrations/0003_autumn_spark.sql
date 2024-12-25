/*
  # Set up initial users and profiles
  
  1. Creates profiles for demo and admin users
  2. Sets up proper roles and permissions
*/

-- Insert or update profiles for our users
INSERT INTO public.profiles (id, email, username, role, status)
VALUES 
  ('37ff6137-d13c-4a90-8abc-1c1c979a4c4a', 'demo@example.com', 'demo', 'annotator', 'active'),
  ('4166f189-b15b-487c-b193-1a9db1c47ab4', 'admin@example.com', 'admin', 'admin', 'active')
ON CONFLICT (id) DO UPDATE
SET 
  email = EXCLUDED.email,
  username = EXCLUDED.username,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = now();
/*
  # Create default users

  1. Creates default admin and demo users with proper UUIDs
  2. Sets up their profiles with correct roles
*/

-- Create demo user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '37ff6137-d13c-4a90-8abc-1c1c979a4c4a',
  'demo@example.com',
  crypt('demo123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;

-- Create admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '4166f189-b15b-487c-b193-1a9db1c47ab4',
  'admin@example.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;

-- Set up profiles
INSERT INTO public.profiles (id, email, username, role)
VALUES 
  ('37ff6137-d13c-4a90-8abc-1c1c979a4c4a', 'demo@example.com', 'demo', 'annotator'),
  ('4166f189-b15b-487c-b193-1a9db1c47ab4', 'admin@example.com', 'admin', 'admin')
ON CONFLICT DO NOTHING;
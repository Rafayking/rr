/*
  # Set up authentication and user management
  
  1. Creates initial users and profiles
  2. Configures authentication settings
  3. Sets up proper roles and permissions
*/

-- Enable row level security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users with proper UUIDs
DO $$
BEGIN
    -- Create demo user if not exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@example.com') THEN
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at
        ) VALUES (
            '37ff6137-d13c-4a90-8abc-1c1c979a4c4a',
            '00000000-0000-0000-0000-000000000000',
            'demo@example.com',
            crypt('demo123', gen_salt('bf')),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            '{"role": "annotator"}',
            now(),
            now()
        );
    END IF;

    -- Create admin user if not exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at
        ) VALUES (
            '4166f189-b15b-487c-b193-1a9db1c47ab4',
            '00000000-0000-0000-0000-000000000000',
            'admin@example.com',
            crypt('admin123', gen_salt('bf')),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            '{"role": "admin"}',
            now(),
            now()
        );
    END IF;
END $$;
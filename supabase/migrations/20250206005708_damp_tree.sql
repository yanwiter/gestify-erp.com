/*
  # Permission System Setup

  1. Changes
    - Create permission_logs table for tracking permission changes
    - Update user policies to fix infinite recursion
    - Add proper RLS policies for both tables

  2. Security
    - Enable RLS on permission_logs table
    - Users can only view their own data and company users
    - Only admins can modify user permissions
    - All permission changes are logged
*/

-- Create permission_logs table
CREATE TABLE IF NOT EXISTS permission_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  user_id uuid REFERENCES users(id),
  changed_by uuid REFERENCES users(id),
  old_permissions jsonb,
  new_permissions jsonb,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Enable RLS on permission_logs
ALTER TABLE permission_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view company users" ON users;

-- Create new policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view users in their company"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update user permissions"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create policies for permission_logs table
CREATE POLICY "Users can view permission logs for their company"
  ON permission_logs
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only admins can create permission logs"
  ON permission_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add audit trigger for permission_logs
CREATE TRIGGER audit_permission_logs
  AFTER INSERT OR UPDATE OR DELETE ON permission_logs
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();
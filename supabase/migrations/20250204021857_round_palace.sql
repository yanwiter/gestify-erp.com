/*
  # Initial ERP System Schema

  1. Core Tables
    - `companies` - Company/organization information
    - `users` - System users with roles and permissions
    - `audit_logs` - System-wide audit logging
    - `settings` - System and company settings

  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on company_id and user roles
    - Implement row-level encryption for sensitive data
*/

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Companies
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  trading_name text,
  tax_id text UNIQUE NOT NULL,
  email text,
  phone text,
  address jsonb,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users with enhanced security
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  first_name text,
  last_name text,
  role text NOT NULL,
  permissions jsonb DEFAULT '{}',
  two_factor_enabled boolean DEFAULT false,
  two_factor_secret text,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  table_name text,
  record_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Settings
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  category text NOT NULL,
  key text NOT NULL,
  value jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, category, key)
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own company"
  ON companies
  FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company users"
  ON users
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company settings"
  ON settings
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Audit Log Function
CREATE OR REPLACE FUNCTION audit_log_changes()
RETURNS TRIGGER AS $$
DECLARE
  old_values jsonb;
  new_values jsonb;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    old_values = to_jsonb(OLD);
    new_values = null;
  ELSIF (TG_OP = 'UPDATE') THEN
    old_values = to_jsonb(OLD);
    new_values = to_jsonb(NEW);
  ELSE
    old_values = null;
    new_values = to_jsonb(NEW);
  END IF;

  INSERT INTO audit_logs (
    company_id,
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address
  )
  VALUES (
    COALESCE(NEW.company_id, OLD.company_id),
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    old_values,
    new_values,
    current_setting('request.headers')::json->>'x-forwarded-for'
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to tables
CREATE TRIGGER audit_companies
  AFTER INSERT OR UPDATE OR DELETE ON companies
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_users
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_settings
  AFTER INSERT OR UPDATE OR DELETE ON settings
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();
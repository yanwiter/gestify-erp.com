/*
  # Financial Module Schema

  1. New Tables
    - `bank_accounts` - Company bank accounts
    - `transactions` - Financial transactions
    - `accounts_payable` - Payables management
    - `accounts_receivable` - Receivables management
    - `cash_flow` - Cash flow records
    - `cost_centers` - Cost center management
    - `chart_of_accounts` - Chart of accounts structure

  2. Security
    - Enable RLS on all tables
    - Add policies for financial data access
*/

-- Bank Accounts
CREATE TABLE bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  bank_name text NOT NULL,
  account_number text NOT NULL,
  branch_number text NOT NULL,
  account_type text NOT NULL,
  currency text DEFAULT 'BRL',
  initial_balance numeric(15,2) DEFAULT 0,
  current_balance numeric(15,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transactions
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  bank_account_id uuid REFERENCES bank_accounts(id),
  type text NOT NULL, -- credit/debit
  amount numeric(15,2) NOT NULL,
  description text,
  category text,
  status text DEFAULT 'pending',
  transaction_date date NOT NULL,
  reconciled boolean DEFAULT false,
  reference_type text, -- invoice, payment, transfer
  reference_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Accounts Payable
CREATE TABLE accounts_payable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  supplier_id uuid NOT NULL,
  invoice_number text,
  amount numeric(15,2) NOT NULL,
  due_date date NOT NULL,
  payment_terms jsonb,
  status text DEFAULT 'pending',
  payment_date date,
  payment_method text,
  notes text,
  attachments jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Accounts Receivable
CREATE TABLE accounts_receivable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  customer_id uuid NOT NULL,
  invoice_number text,
  amount numeric(15,2) NOT NULL,
  due_date date NOT NULL,
  payment_terms jsonb,
  status text DEFAULT 'pending',
  payment_date date,
  payment_method text,
  notes text,
  attachments jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cash Flow
CREATE TABLE cash_flow (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  date date NOT NULL,
  type text NOT NULL, -- actual/forecast
  category text NOT NULL,
  amount numeric(15,2) NOT NULL,
  description text,
  reference_type text,
  reference_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cost Centers
CREATE TABLE cost_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  parent_id uuid REFERENCES cost_centers(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, code)
);

-- Chart of Accounts
CREATE TABLE chart_of_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  parent_id uuid REFERENCES chart_of_accounts(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, code)
);

-- Enable RLS
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_payable ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_receivable ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their company's bank accounts"
  ON bank_accounts
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's payables"
  ON accounts_payable
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's receivables"
  ON accounts_receivable
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's cash flow"
  ON cash_flow
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's cost centers"
  ON cost_centers
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their company's chart of accounts"
  ON chart_of_accounts
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id 
    FROM users 
    WHERE users.id = auth.uid()
  ));

-- Add audit triggers
CREATE TRIGGER audit_bank_accounts
  AFTER INSERT OR UPDATE OR DELETE ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_transactions
  AFTER INSERT OR UPDATE OR DELETE ON transactions
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_accounts_payable
  AFTER INSERT OR UPDATE OR DELETE ON accounts_payable
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_accounts_receivable
  AFTER INSERT OR UPDATE OR DELETE ON accounts_receivable
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_cash_flow
  AFTER INSERT OR UPDATE OR DELETE ON cash_flow
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_cost_centers
  AFTER INSERT OR UPDATE OR DELETE ON cost_centers
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER audit_chart_of_accounts
  AFTER INSERT OR UPDATE OR DELETE ON chart_of_accounts
  FOR EACH ROW EXECUTE FUNCTION audit_log_changes();
export interface Empleado {
  id: string;
  first_name: string;
  last_name: string;
  dui: string;
  nit: string;
  isss_number: string;
  afp_number: string;
  birth_date: string;
  hire_date: string;
  termination_date: string | null;
  gender: string;
  marital_status: string;
  address: string;
  phone: string;
  email: string;
  position: string;
  department: string;
  salary_base: number;
  bank_name: string;
  bank_account: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

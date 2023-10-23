export interface Response {
  data: Data[];
  pages: Pages;
}

export interface Data {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  Date: Date;
  Amount: number;
  FromAccountID: number;
  ToAccountID: number;
  TransactionStatusID: number;
  FromAccount: Account;
  ToAccount: Account;
  TransactionStatus: TransactionStatus;
}

export interface Account {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  number: string;
  CustomerID: number;
  AccountTypeID: number;
  Balance: number;
  Customer: Customer;
  AccountType: TransactionStatus;
}

export interface TransactionStatus {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  type?: string;
  status?: string;
}

export interface Customer {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  email: string;
  name: string;
  accounts: null;
  bank: number;
  Bank: Bank;
}

export interface Bank {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  name: string;
  description: string;
  Customers: null;
}

export interface Pages {
  current_page: number;
  next_page: number;
  total_pages: number;
  limit: number;
}

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
  PaymentMethodID: number;
  FromAccount: Account;
  ToAccount: Account;
  TransactionStatus: PaymentMethod;
  PaymentMethod: PaymentMethod;
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
  AccountType: PaymentMethod;
}

export interface PaymentMethod {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  type?: Type;
  method?: Method;
  status?: Status;
}

export enum Method {
  CheckDeposit = "Check Deposit",
  Transfer = "Transfer",
  Wiring = "Wiring",
}

export enum Status {
  Completed = "Completed",
  Pending = "Pending",
}

export enum Type {
  Credit = "Credit",
  Debit = "Debit",
  Payroll = "Payroll",
  Savings = "Savings",
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
  name: Name;
  description: Description;
  Customers: null;
}

export enum Description {
  BanksForAwesomePeople = "Banks for Awesome people",
  BanksForBabalPeople = "Banks for Babal People",
  BanksForCunningPeople = "Banks for Cunning People",
  BanksForDarnGoodPeople = "Banks for Darn Good People",
  BanksForETechLovers = "Banks for E-tech Lovers",
}

export enum Name {
  ABank = "A Bank",
  BBank = "B Bank",
  CBank = "C Bank",
  DBank = "D Bank",
  EBank = "E Bank",
}

export interface Pages {
  current_page: number;
  next_page: number;
  total_pages: number;
  limit: number;
  total_items: number;
}

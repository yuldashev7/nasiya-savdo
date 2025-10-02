import type { TableProps } from 'antd/es/table';
import type { JSX, ReactNode } from 'react';

export interface dataT {
  username?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  wallet?: number | string;
  id?: string;
  password?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

export interface ModalT {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export type FieldType = {
  username?: string;
  password?: string;
};

export interface adminT {
  id: string;
  fullName?: string;
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  phoneNumber?: string;
  wallet?: number;
  name?: string;
}

export interface sellerT {
  role: string;
  phoneNumber: string;
  isActive: boolean;
  wallet: number;
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface columnsT {
  title?: string;
  dataIndex?: string;
  address?: string;
  id?: string;
  key?: string;
  width?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface tableT {
  dataSource: dataT[];
  loading?: boolean;
}

export interface inputErrT {
  message: string;
  data?: {
    errors?: Record<string, string>;
  };
}

export interface EditAdminPayload {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export type CustomeTableProps<T> = {
  dataSource: T[];
  columns: TableProps<T>['columns'];
  loading?: boolean;
  onDelete?: (id: string) => void;
  pageSize?: number;
};

export interface debtorT {
  id: string;
  fullName: string;
  address: string;
  description?: string;
  phoneNumber: string;
  storeId?: string | null;
  imageDebtor: string;
  createdAt: string;
  // imageDebt: string;
  // monthlySum?: number;
  // remnant?: number;
  // product: string;
  // date: string;
  // period: number;
  // sum: number;
}

export type customeFormT = {
  onSubmit: (values: any) => void;
  loading?: boolean;
  extraFields?: ReactNode;
  isDebtor?: boolean;
};

export type storeT = {
  id: string;
  name: string;
};

export interface PasswordT {
  username?: string;
  email?: string;
}

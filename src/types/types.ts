import type { JSX } from 'react';

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
  email: string;
  role?: string;
  isActive?: boolean;
  phoneNumber?: string;
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

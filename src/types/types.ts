export interface dataT {
  // id: string;
  username: string;
  email: string;
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
  username: string;
  password?: string;
  email: string;
  role?: string;
  isActive?: boolean;
}

export interface columnsT {
  title: string;
  dataIndex?: string;
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

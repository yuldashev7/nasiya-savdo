import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AntdProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Grid: {
            sizeSM: 345,
            sizeMD: 580,
            sizeLG: 920,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;

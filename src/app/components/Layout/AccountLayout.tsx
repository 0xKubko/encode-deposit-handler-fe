'use client';

import { ReactNode } from 'react';
import useAccountListener from '../../hooks/useAccountListener';

export const AccountLayout = ({ children }: { children: ReactNode }) => {
  useAccountListener();

  return (
    <div>
      {children}
    </div>
  );
};

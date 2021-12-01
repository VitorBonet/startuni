import React, { ReactNode } from 'react';

import { Container } from './styles';

interface IMiddleColumnProps {
  children: ReactNode;
  className: string;
}

export function MiddleColumn({ children, className }: IMiddleColumnProps) {
  return (
    <Container className={`middle-column ${className}` }>
      {children}
    </Container>
  );
};

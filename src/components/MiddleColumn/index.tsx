import React, { ReactNode } from 'react';

import { Container } from './styles';

interface IMiddleColumnProps {
  children: ReactNode;
}

export function MiddleColumn({ children }: IMiddleColumnProps) {
  return (
    <Container className="middle-column">
      {children}
    </Container>
  );
};

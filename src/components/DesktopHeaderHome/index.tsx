import React from 'react';
import SingInButton from './SingInButton';
import { SingUpButton } from './SingUpButton';

import { 
  Container, 
  Wrapper, 
  Logo, 
} from './styles';

interface DesktopHeaderHomeProps {
  backHeaderAndIcon: boolean;
}

export function DesktopHeaderHome({ backHeaderAndIcon }: DesktopHeaderHomeProps) {
  return (
    <Container backHeaderAndIcon={backHeaderAndIcon}>
      <Wrapper>
        <div className="left">
          {backHeaderAndIcon && (
            <>
            <Logo src="/logoText.png" alt="startuni"/>
            </>
          )}
        </div>
        <div className="right">
          <nav>
              <SingInButton />
              <SingUpButton />
          </nav>
        </div>
      </Wrapper>
    </Container>
  );
}
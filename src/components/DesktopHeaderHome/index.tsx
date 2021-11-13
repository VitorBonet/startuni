import React from 'react';
import NavButton from './NavButton';
import SingInButton from './NavButton';
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
            <div className="left">
              {/* <Logo src="/logoText.png" alt="startuni"/> */}
              <img src="/rocketIcon.svg" alt="rocket" />
              <div className="titleDiv">
                <h3>StartUni</h3>
                <label>STARTUP UNIVERSE</label>
              </div>
    
            </div>
          )}
        </div>
        <div className="right">
          <nav>
              <NavButton text="Entrar" />
              <SingUpButton />
          </nav>
        </div>
      </Wrapper>
    </Container>
  );
}
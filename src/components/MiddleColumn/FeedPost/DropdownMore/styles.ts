import styled, { css } from 'styled-components';

export const DropDownDiv = styled.div`
  position: absolute;
  margin-left: -11rem;
`;

export const DropDown = styled.div`
  width: 190px;
  background-color: var(--gray-700);
  padding: 0.5rem;  
  overflow: hidden; 
  border: 1px solid var(--gray-700);
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 2px 3px rgb(0 0 0 / 20%);
  transform: translateX(0%);

  .menu-primary.enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary.enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  .menu-primary.exit {
  }
  .menu-primary.exit-active {
    transform: translateX(-100%);
    transition: all 500ms ease;
  }

  .menu-secondary.enter {
    position: absolute;
    transform: translateX(110%);
  }
  .menu-secondary.enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  .menu-secondary.exit {
  }
  .menu-secondary.exit-active {
    transform: translateX(100%);
    transition: all 500ms ease;
  }
`;

export const DropDownItem  = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 35px;
  display: flex;
  align-items: center;
  border-radius: var(--gray-300);
  transition: 0.2s;
  padding: 0.5rem;
  color: var(--gray-100);

  border: 1px solid var(--gray-700);
  background-color: var(--gray-700);
  border-radius: 5px;

  cursor: pointer;

  &:hover { 
    filter: brightness(0.8);
  }
`;

export const DropDownItemText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const DropDownItemIconDiv = styled.div`
  background-color: var(--gray-700);
  filter: brightness(0.8);
  border-radius: 50%; 
  font-size: 15px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
import styled, { css } from 'styled-components';
import { GrLinkedin } from 'react-icons/gr';
import { AiFillHome, AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';

export const Container = styled.div`
  cursor: pointer;  
`;

export const ProfileCircle = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 12px;
  border: 1px solid var(--color-icons);
  object-fit: cover;
`;

export const ProfileIconCircle = styled.div`
  cursor: pointer;  

  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: var(--purple-600);    
  background: var(--pink-50);
  border-radius: 12px;
  margin-right: 10px;
`;

export const CaretDownIcon = styled(AiFillCaretDown)`
  width: 10px;
  height: 10px;
  color: var(--gray-300);
  margin-left: -8px;
`;

export const CaretDownIconProfileIcon = styled(AiFillCaretDown)`    width: 10px;
  height: 10px;
  color: var(--green-700);
  margin-left: 29px;
  margin-top: 28px;
  position: absolute;
`;

export const DropDownDiv = styled.div`
  position: absolute;
  top: 58px;
  /* right: 90px; */
  margin-left: -4rem;
`;

export const DropDown = styled.div`
  width: 190px;
  /* color: var(--purple-600);     */
  background: var(--pink-50);
  padding: 0.5rem;  
  overflow: hidden; 
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
  padding: 0.2rem;
  margin: 0.2rem;
  color: var(--purple-700);

  border: 1px solid linear-gradient(90deg,var(--pink-50) 0%,var(--purple-50) 120%);
  background: linear-gradient(90deg,var(--pink-50) 0%,var(--purple-50) 120%);
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
  filter: brightness(0.8);
  border-radius: 50%; 
  font-size: 15px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
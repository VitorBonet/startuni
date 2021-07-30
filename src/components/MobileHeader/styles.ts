import styled from 'styled-components';
import { FiMessageSquare } from 'react-icons/fi';
import {AiOutlineBars,  AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';

export const Container = styled.div`
  border-bottom: 0.5px solid #323238;
  background-color: var(--gray-950);
  padding: 0 30px;

  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  @media (min-width: 870px) {
    display: none;
  }
`;

export const ButtonExpandHeader = styled(AiOutlineBars)`
  color: var(--gray-100);
  /* font-size: 1.275rem; */
  font-size: 20px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ProfileCircle = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--color-icons);
  flex-shrink: 0;
`;

export const ProfileIconCircle = styled.div`
  cursor: pointer;  

  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: var(--gray-100);
  background-color: var(--gray-800);
  border-radius: 50%;
  margin-right: 10px;
`;

export const CaretDownIconProfileIcon = styled(AiFillCaretDown)`    width: 10px;
  height: 10px;
  color: var(--gray-300);
  margin-left: 27px;
  margin-top: 24px;
  position: absolute;
`;

export const SideBarContainer = styled.div`
  background-color: var(--gray-950);
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 2;
  transition: 0.2s;
  width: 0%;

  @media (min-width: 870px) {
    display: none;
  }

  &.active {
    /* left: 0; */
    width: 80%;
  }
`;

export const HeaderSideBar = styled.div`
  border-bottom: 3px solid #323238;
  background-color: var(--gray-950);
  height: 50px;
  width: 100%;
  
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const HeaderSideBarCloseIcon = styled(AiOutlineClose)`
  font-size: 1.275rem;
  color: var(--gray-100);
  cursor: pointer;
  transition: filter 0.2s;
  margin: 0 30px;

  &:hover {
    filter: brightness(0.8);
  }
`;


export const BodySideBarDiv = styled.div`
  width: 100%;
  overflow: auto; 
`;

export const BodySide = styled.div`
  padding: 1.5rem;  
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

export const BodySideItem  = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 35px;
  display: flex;
  align-items: center;
  border-radius: var(--gray-300);
  transition: 0.2s;
  padding: 1.5rem;
  color: var(--gray-100);
  border-radius: 5px;

  cursor: pointer;

  &:hover { 
    /* filter: brightness(0.8); */
    background-color: var(--gray-700);
  }
`;

export const BodySideItemText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const BodySideItemIconDiv = styled.div`
  background-color: var(--gray-700);
  filter: brightness(0.8);
  border-radius: 50%; 
  font-size: 15px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
import styled from 'styled-components';
import { FiMessageSquare } from 'react-icons/fi';
import {AiOutlineBars,  AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';
import {HiOutlineMenuAlt2 } from 'react-icons/hi';

export const Container = styled.div`
  padding: 0 30px;

  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

  @media (min-width: 870px) {
    /* display: none; */
  }
`;

export const ButtonExpandHeader = styled(HiOutlineMenuAlt2)`
  color: var(--gray-300);
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
  background-color: var(--white-100);
  border-right: 1px solid var(--gray-100);
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 3;
  transition: 0.4s;
  width: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &.open {
    width: 188px;
    align-items: center;
    margin-left: 15px;
  }
`;

export const HeaderSideBar = styled.div`
  height: 50px;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.open {  
    justify-content: flex-end;
  }
`;

export const HeaderSideBarCloseIcon = styled(AiOutlineClose)`
  font-size: 1.275rem;
  color: var(--gray-300);
  cursor: pointer;
  transition: filter 0.2s;
  margin: 0 30px;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const BodySideBar = styled.div`
  width: 100%;
`;

export const ItemSideBar = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-right: 1.5px solid var(--purple-400);
  }

  &.active {
    border-right: 1.5px solid var(--purple-400);
  }

  >div {
    color: var(--gray-300);
    padding: 8px 10px;
    border-radius: 8px;
    transition: opacity 1s ease-out;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;

    label {
      margin-left: 12px;
      display: none;
      opacity: 0;
    }

    &:hover {
      background: rgb(250,124,242);
      background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-50) 120%);
      color: var(--purple-600);
    }

    &.active {
      background: rgb(250,124,242);
      background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-50) 120%);
      color: var(--purple-600);
    }
  }

  &.open {
    justify-content: start;

    >div {
      label {
        display: unset;
        opacity: 1;
        cursor: pointer;
      }

      width: 170px;
    }
  }
  
`;

export const ImageSideBar = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  margin-bottom: 26px;
  margin-top: -42px;
  transition: opacity 0.2s ease-out;
  flex-wrap: nowrap;
  white-space: nowrap;

  img {
    height: 5rem;
    transform: rotate(50deg);
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 1rem;
    color: var(--purple-600);
  }

  label {
    font-size: 0.7rem;
    color: var(--purple-400);
  }

  &.open {
    opacity: 1;
  }
`;

export const ImageSideBarText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FooterSideBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  gap: 8px;
  overflow: hidden;
  flex-wrap: nowrap; 
  white-space: nowrap;
  width: 100%;
`;

export const SideBarUser = styled.div`
  padding: 8px 10px;
  margin: 10px 0;
  border-radius: 50%;
  background: var(--gray-100);
  color: var(--purple-600);
`;

export const SideBarUserText = styled.div`
  display: none;
  opacity: 0;
  
  h3 {
    font-size: 1rem;
    color: var(--purple-600);
  }

  label {
    font-size: 0.7rem;
    color: var(--purple-400);
  }

  &.open {
    display: unset;
    opacity: 1;
  }
`;
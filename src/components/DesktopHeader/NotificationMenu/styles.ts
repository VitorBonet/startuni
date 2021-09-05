import styled, { css } from 'styled-components';

export const Container = styled.div`
  cursor: pointer;  

  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: var(--purple-600);    
  background: linear-gradient(90deg,var(--pink-50) 0%,var(--purple-50) 120%);
  border-radius: 12px;
  margin-right: 10px;
`;

export const ProfileCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 12px;
  border: 1px solid var(--color-icons);
`;

export const NotificationWarn = styled.div`
  position: absolute;
  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--green-700);
  color: var(--gray-100);
  margin-left: 10px;
  margin-top: -13px;
  font-size: 6px;
`;

export const DropDownDiv = styled.div`
  position: absolute;
  top: 58px;
  /* right: 120px; */
  margin-left: -16rem;
`;

export const DropDown = styled.div`
  width: 350px;
  background: linear-gradient(90deg,var(--pink-50) 0%,var(--purple-100) 120%);
  padding: 0.5rem;  
  overflow: hidden; 
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 2px 3px rgb(0 0 0 / 20%);
`;

export const DropDownTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  color: var(--purple-900);
  margin-bottom: 0.5rem;
  padding: 0.5rem;

  p {
    font-size: 0.6rem;
    color: var(--purple-600);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const DropDownItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--gray-950);
    border-radius: 10px;
  }
`;

export const DropDownItem  = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  display: flex;
  align-items: center;
  border-radius: var(--gray-300);
  transition: 0.2s;
  padding: 0.5rem;
  color: var(--purple-900);
  background-color: var(--purple-30);

  border: none;
  background-color: translate;
  border-radius: 5px;

  cursor: pointer;

  &:hover { 
    background-color: var(--purple-50);
    filter: brightness(0.8);
  }
`;

export const DropDownItemLefft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid var(--color-icons);
  }
`;

export const DropDownItemIcon = styled.div`
  font-size: 30px;
  margin-right: 20px;
`;

export const DropDownItemText = styled.div`
  text-align: left;
  font-size: 0.825rem;

  p {
    font-size: 0.725rem;
    color: var(--purple-600);
  }
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

export const DropDownItemTextHasNotif = styled.div`  
  width: 10px;
`;

export const DropDownItemTextHasNotifBall = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--red-500);
`;

export const DropDownViewAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;
  transition: 0.2s;
  padding: 0.3rem;
  color: var(--green-700);
  margin-top: 1rem;

  background-color: transparent;
  border-radius: 5px;

  cursor: pointer;

  &:hover { 
    filter: brightness(0.8);
  } 
`;
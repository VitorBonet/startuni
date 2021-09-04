import { url } from 'node:inspector';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-100) 120%);
  overflow-x: hidden;
`;

const appearWithOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  padding: 88px;
  gap: 16px;

  animation: ${appearWithOpacity} 3s;

`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-end-start-radius: 80px;
  background-color: var(--white-100);
  width: 100%;
  animation: ${appearFromLeft} 2s;
`;

export const RightHeader  = styled.div`
  display: flex;
  padding: 10px 55px;
  width: 100%;

  img {
    height: 40px;
    transform: rotate(50deg);
    margin-bottom: 6px;
  }

  .titleDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-family: 'Roboto', sans-serif;
      color: var(--blue-700);
      font-size: 15px;
    }

    label {
      font-family: 'Lato', sans-serif;
      color: var(--gray-300);
      font-size: 9px;
    }
  }
`;

export const RightBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 49px;
`;

export const RightBodyCntent = styled.div `
  max-width: 405px;
  width: 100%;
`;


export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BodyTitle = styled.div`
  margin-bottom: 8px;
`;

export const LinksDiv = styled.div`
  color: var(--gray-300);
  text-align: left;
  font-size: 0.9rem;
  transition: filter 0.2s;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  a {
      color: var(--green-700);
      cursor: pointer;

      &:hover {
        filter: brightness(0.8);
      }
    }
`;

export const InputCheckBoxText = styled.p`
  font-size: 0.9rem;
  a {
    color: var(--green-700);
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const RightFooter = styled.div`
  padding: 16px 55px;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  font-size: 0.75rem;
  color: var(--gray-300);

  a {
      cursor: pointer;

      &:hover {
        filter: brightness(0.8);
      }
    }
`;

export const ButtonMidia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
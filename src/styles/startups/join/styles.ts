import { url } from 'node:inspector';
import styled, { keyframes } from 'styled-components';

export const Body = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-100) 120%);
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
  width: 30%;
  padding: 0 70px;
  gap: 16px;

  animation: ${appearWithOpacity} 3s;

  div {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 15rem;
  }
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


export const TimeLineHeaderDiv  = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 0 30px 0;
`;

export const TimeLineHeader  = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-100) 120%);
  border-radius: 20px;
  width: 600px;
  padding: 0 50px;
`;
export const TimeLineItem  = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 24px;
  gap: 2px;
  color: var(--purple-900);

  &.active {
    color: var(--white-100);
  }
`;

export const TimeLineBall  = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--purple-900);

  &.active {
    background-color: var(--white-100);
  }
`;

export const RightBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 49px;
`;

export const RightBodyCntent = styled.div `
  max-width: 500px;
  width: 100%;
`;


export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.formSpaceRange {
    gap: 35px;
  }
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


export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  a {
    transition: filter 2s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 5px;

    &:hover {
      border: 1px solid var(--green-700);
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

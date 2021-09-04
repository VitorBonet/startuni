import { url } from 'node:inspector';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: linear-gradient(90deg, var(--pink-50) 0%, var(--purple-100) 120%);
  overflow-x: hidden;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContentLeft = styled.div`
  animation: ${appearFromLeft} 1s;  
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-end-end-radius: 80px;
  background-color: var(--white-100);
  width: 100%;
  animation: ${appearFromLeft} 2s;
`;

export const LeftHeader  = styled.div`
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

export const LeftBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 49px;
`;

export const LeftBodyCntent = styled.div `
  max-width: 405px;
  width: 100%;
`;


export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BodyTitle = styled.div`
  color: var(--purple-900);
  margin-bottom: 24px;

  a {
    color: var(--green-700);
  }
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
      cursor: pointer;

      &:hover {
        filter: brightness(0.8);
      }
    }
`;

export const LeftFooter = styled.div`
  padding: 16px 55px;
  display: flex;
  justify-content: flex-start;
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
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const appearWithOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  padding: 88px;
  gap: 16px;

  animation: ${appearWithOpacity} 3s;

  @media (max-width: 905px) {
    display: none;
  }

  h3 {
    color: var(--purple-900);
    font-size: 27px;
  }

  label {
    color: var(--gray-100);
  }

  img {
    height: 10rem;
  }
`;
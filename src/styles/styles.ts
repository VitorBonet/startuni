import { url } from 'node:inspector';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const DivTeste = styled.div`
  color: red;
  background-color: pink;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  > span {
    margin-top: 48px;
    display: flex;
  }

  @media (min-width: 870px) {
    > main {
      margin: 0 30px;
      display: flex;
      justify-content: center;
    }

    > span {
      margin-top: 52;
      padding: 8px 0;
    }
  }

  .left-column,
  .right-column,
  .ad-banner {
    display: none;
  }

  @media (min-width: 870px) {
    .left-column,
    .right-column,
    .ad-banner {
      display: unset;
    }

    .middle-column {
      margin: 0 25px 16px;
    }
  }
`;

export const PrincipalSection = styled.section`
  display: flex;
  height: 40rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 3rem;

  img {
    height: 20rem;
  }
`;

export const PrincipalSectionDegrade = styled.div`
  width: inherit;
  height: inherit;
`;

export const PrincipalSectionDegradeHorizontal = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;

  button {
    height: 2.2rem;
    border-radius: 0.5rem;
    border: none;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-100);
    font-weight: bold;
    transition: filter 0.2s;
    cursor: pointer;
    background-color: var(--red-700);
    width: 5rem;
    border-top-right-radius: 4rem;
    border-bottom-left-radius: 4rem;
    margin-top: 1rem;
    margin-left: 3rem;
    
    transition: brightness 0.2s;

    text-align: center;
    line-height: 100px;
    letter-spacing: -1px;
    cursor: pointer;
    box-shadow: 0 0 0 0 var(--red-700);

    &:hover {
      filter: brightness(0.8);
    }
  }

  
  @media (max-width: 1080px) {
    max-width: 100%;
  }
`;

const appearDiagonalAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate(-200px, 100px);
  }
  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`;

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


export const PrincipalSectionDegradeHorizontalTitle = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  display: flex;

  span {
    color: var(--purple-100);
    animation: ${appearAnimation} 4s;
  }

  .marginDiv {
    margin-right: 8px;
  }

  div {
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: var(--purple-900);
    color: transparent;
    animation: ${appearDiagonalAnimation} 1s;
  }

  img {
    margin-right: 1rem;
    margin-bottom: -0.5rem;
    animation: ${appearAnimation} 3s;
  }
`;

export const PrincipalSectionDegradeHorizontalText = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--purple-900);
  max-width: 65%;
  animation: ${appearDiagonalAnimation} 1s;
  
  @media (max-width: 1080px) {
    max-width: 100%;
  }
`;

export const SecondSection = styled.section`
  position: relative;
  
  background-color: var(--purple-100);
  height: 40rem;
  width: 100%;
`;

export const Footer = styled.footer`
  position: relative;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  top: 40rem; 
  background-color: var(--gray-950);
  color: var(--gray-300);
  min-height: 15rem;
  width: 100%;
`;

export const FooterContent = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  max-width: 1128px;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 720px) {
    margin-top: 6rem;
  }
`;

export const FooterContentText = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  gap: 2rem;

  @media (max-width: 720px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const FooterItem = styled.div`
  width: 50%;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const FooterTitle = styled.h3``;

export const FooterText = styled.p``;

export const FooterContentSepartor = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--gray-800);
  margin: 16px 0 12px;
`;

export const FooterContentMidia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterContentMidiaText = styled.div``;

export const FooterContentMidiaItens = styled.div``;

export const SocialMidiaDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const SocialMidiaItem = styled.div`
  height: 1.8rem;
  width: 1.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  color: var(--gray-300);
  background-color: var(--gray-700);
`;

export const Facebook = styled(FaFacebookF)``;

export const Twitter = styled(FaTwitter)``;

export const Instagram = styled(FaInstagram)``;

export const Linkedin = styled(FaLinkedinIn)``;

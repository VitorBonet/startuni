import { url } from 'node:inspector';
import styled from 'styled-components';

export const Body = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 59px;
  padding-top: 100px;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 0 50px 50px;
`;

export const OptionsDiv = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
`;

export const Option = styled.div`
  cursor: pointer;
  padding: 8px 0;
  font-size: 18px;
  letter-spacing: .5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all .2s linear;
  
  div {
    background-color: var(--gray-300);
    width: 14px;
    height: 2px;
    transition: all .2s linear;
    bottom: 0;
  }
  
  &:hover {
    div {
      background-color: var(--purple-500);
      width: 100%;
    }
  }

  &.active {
    div {
      background-color: var(--purple-500);
      width: 100%;
    }
  }
`;

export const StartupCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const NotFoundStartupsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 24px;
  margin: 16px 0;

  img {
    height: 250px;
  }
`;
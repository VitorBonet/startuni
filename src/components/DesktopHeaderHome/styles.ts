import styled, { css } from 'styled-components';

interface IContainerProps {
  backHeaderAndIcon: boolean;
}

export const Container = styled.div<IContainerProps>`
  /* border-bottom: 1px solid #323238; */
  padding: 0 30px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transition: background 0.2s;

  ${props => props.backHeaderAndIcon ? 'background: var(--white);' : ''}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

  max-width: 1128px;
  margin: 0 auto;
  height: 52px;

  .left,
  .right nav {
    display: flex;
    align-items: center;
  }

  .left {
    p {
      color: var(--white);
      margin-left: 0.5rem;

      span {
        color: var(--red-500);
      }
      
      @media (max-width: 1180px) {
        display: none;
      }
    }
    
  }

  .right nav {
    height: 100%;

    button {
      background: none;
      border: 0;
      outline: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 90px;
      min-height: 100%;

      color: var(--pink-400);
      cursor: pointer;
      &:hover {
        color: var(--pink-600);
      }
      &.active {
        border-bottom: 2px solid var(--white);
      }
    }
  }
`;

export const Logo = styled.img`
  height: 42px;
  flex-direction: 0;
`;
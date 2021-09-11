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
    
    img {
      height: 35px;
      transform: rotate(50deg);
      margin-bottom: 6px;
    }

    .titleDiv {
      display: flex;
      flex-direction: column;

      h3 {
        font-family: 'Roboto', sans-serif;
        color: var(--blue-700);
        font-size: 13px;
      }

      label {
        font-family: 'Lato', sans-serif;
        color: var(--gray-300);
        font-size: 7px;
      }
    }
  }

  .right nav {
    height: 100%;
  }
`;

export const Logo = styled.img`
  height: 42px;
  flex-direction: 0;
`;
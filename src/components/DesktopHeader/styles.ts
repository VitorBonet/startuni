import styled, { css } from 'styled-components';
import { AiFillHome, AiOutlineBell } from 'react-icons/ai';

export const Container = styled.div`
  border-bottom: 1px solid var(--gray-100);
  background-color: transparent;
  padding: 0 30px;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  width: calc(100% - 60px);
  transition: 0.2s;

  display: none;

  @media (min-width: 870px) {
    display: block;
  }

  &.open {
    width: calc(100% - 203px);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

  max-width: 1128px;
  margin: 0 auto;
  height: 52px;

  div:first-child {
    cursor: pointer;
  }

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

      color: var(--gray-100);
      cursor: pointer;
      &:hover {
        color: var(--write);
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

const generalIconsCSS = css`
  width: 24px;
  height: 24px;
`;

export const HomeIcon = styled(AiFillHome)`
  ${generalIconsCSS}
`;

export const NotificationIcon = styled(AiOutlineBell)`
  ${generalIconsCSS}
`;

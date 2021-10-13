import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  outline: none;  
  text-align: left;

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--purple-900);
      color: var(--purple-900);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--purple-900);
    `}
`;

export const SelectContainer = styled.div<InputProps>`
  color: var(--gray-300);
  border-radius: 5px;
  width: 100%;
  border: 1px solid var(--gray-300);
  display: flex;
  align-items: center;
  margin-top: 7px;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red-600);
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: var(--purple-900);
      color: var(--purple-900);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--purple-900);
    `}

  select {
    padding: 5px;
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--purple-900);

    &.withIcon {
      margin-left: -41px;
      padding-left: 30px;
    }

    &::placeholder {
      color: #666360;
    }

    &:focus{
      outline: none;
    }

    option {
      background: var(--white-100);
      color: var(--purple-900);
      border-radius: 5px;
      padding: 5px;
      width: 100%;
    }
  }

  svg {
    margin-right: 16px;
    margin-left: 5px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin-right: 0;
  }

  span {
    background: var(--red-600);
    color: var(--white-100);
    &::before {
      border-color: var(--red-600) transparent;
    }
  }
`;
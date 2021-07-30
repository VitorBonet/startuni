import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  color: var(--gray-300);
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--gray-100);
      color: var(--gray-100);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--gray-100);
    `}
`;

export const InputContainer = styled.div<InputProps>`
  border-radius: 5px;
  color: var(--gray-300);

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red-700);
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: var(--gray-100);
      color: var(--gray-100);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--gray-100);
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4edef;
    &::placeholder {
      color: #666360;
    }

    &:focus{
      outline: none;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin-right: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
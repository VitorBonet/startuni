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
  text-align: left;

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

export const Buttons = styled.div<InputProps>`
  display: flex;

`;

export const ButtonsContainer = styled.div<InputProps>`
  padding: 5px;
  width: 100%;
  color: var(--gray-300);
  margin-top: 7px;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      color: var(--red-700);
    `}
  ${props =>
    props.isFocused &&
    css`
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
  svg {
    margin-right: 16px;
  }

  input[type="radio"] {
    filter: hue-rotate(150deg);
  }

  label {
    margin-left: 5px;
  }
`;

export const Button = styled.div`
  background: transparent;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  border: 1px solid var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;

  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }

  &.selected {
    background: var(--red-700);
    border: 1px solid var(--red-700);
    color: var(--gray-100);

    &:hover { }
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
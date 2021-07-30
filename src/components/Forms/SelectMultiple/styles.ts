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

export const SelectContainer = styled.div<InputProps>`
  background: #232129;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  border: 2px solid #232129;
  color: var(--gray-300);
  display: flex;
  align-items: center;
  margin-top: 7px;
  & + div {
    margin-top: 8px;
  }
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

  select {
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

    option {
      background-color: #232129;
      border-radius: 5px;
      padding: 5px;
      width: 100%;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const SelectDiv = styled.div`
  width: 100%;
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
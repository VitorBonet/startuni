import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  color: var(--purple-900);
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

export const InputContainer = styled.div<InputProps>`
  background: var(--white-100);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  border: 1px solid var(--gray-300);
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
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--purple-900);
    &::placeholder {
      color: var(--gray-300);
    }

    &:focus{
      outline: none;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin-right: 0;
  }
  span {
    background: var(--red-600);
    color: #fff;
    &::before {
      border-color: var(--red-600) transparent;
    }
  }
`;

export const DescriptionTooltip = styled(Tooltip)`
  margin-left: 8px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0;
  }
  span {
    font-size: 0.725rem;
    text-align: left;

    background: var(--purple-100);
    color: #fff;
    &::before {
      border-color: var(--purple-100) transparent;
    }
  }
`;
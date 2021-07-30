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

export const InputContainer = styled.div<InputProps>`
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
`;

export const Error = styled(Tooltip)`
  position: initial;  
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

export const SearchResult = styled.div`
  background: #232129;
  padding: 0.5rem;
  margin-top: 158px;
  width: 100%;
  max-height: 100px;
  overflow-y: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.28);

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--gray-950);
    border-radius: 10px;
  }
`;

export const SearchResultGroup = styled.div`
  cursor: pointer;
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 35px;
  display: flex;
  align-items: center;
  border-radius: var(--gray-300);
  transition: 0.2s;
  padding: 0.5rem;
  color: var(--gray-100);

  border-radius: 5px;

  cursor: pointer;

  &:hover { 
    filter: brightness(0.8);
  }
`;
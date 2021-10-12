import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  text-align: center;
  color: var(--purple-900);
  outline: none;  
  text-align: left;

  ${props =>
    props.isFocused &&
    css`
      color: var(--purple-900);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--purple-900);
    `}
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
`;

export const InputContainer = styled.div<InputProps>`
  background: var(--white-100);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
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

    -webkit-appearance: none;
    background: var(--gray-100);
    outline: none;
    width: 100%;
    height: 4px;
    border-radius: 9px;   

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%; 

      background: var(--purple-100);
      cursor: pointer;
  }

  &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%; 

      background: var(--purple-100);
      cursor: pointer;
  }

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


export const Steps = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

export const Step = styled.div`
  height: 8px;
  width: 2px;
  background: var(--gray-300);
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
    width: 636px;
    font-size: 0.725rem;
    text-align: left;

    background: var(--purple-100);
    color: #fff;
    &::before {
      border-color: var(--purple-100) transparent;
    }
  }
`;
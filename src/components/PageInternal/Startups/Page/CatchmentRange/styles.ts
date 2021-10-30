import styled, { css } from 'styled-components';

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
`;

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
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
  color: var(--purple-900);
  display: flex;
  align-items: center;
  margin-top: 7px;
  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--purple-900);

    /* -webkit-appearance: none; */
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

    &::-ms-fill-lower {
        background: red;
        border-radius: 10px;
    }

    &::-ms-fill-upper {
        background: #ddd;
        border-radius: 10px;
    }

    &::placeholder {
      color: var(--gray-300);
    }
  }
  svg {
    margin-right: 16px;
  }
`;
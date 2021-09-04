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

    .react-datepicker-wrapper {
      display: inline-block;
      padding: 0;
      border: 0;
      width: 100%;
    }

    .react-datepicker__input-container {
      position: relative;
      display: inline-block;
      width: 100%;

      input {
        width: 100%;
        background: transparent;
        border: none;
        color: var(--purple-900);
      }

      input:focus-visible {
        outline: transparent;
      }
    }

    .react-datepicker__header {
      text-align: center;
      background-color: var(--pink-50);
      color: var(--purple-900);
      border-bottom: 0px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      padding-top: 8px;
      position: relative;
    }

    .react-datepicker__current-month {
      margin-top: 0;
      color: var(--purple-900);
      font-weight: bold;
      font-size: 0.944rem;
    }

    .react-datepicker__day-name {
      color: var(--purple-900);
      display: inline-block;
      width: 1.7rem;
      line-height: 1.7rem;
      text-align: center;
      margin: 0.166rem;
    }

    .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
      border-radius: 0.3rem;
      background-color: var(--purple-200);
      color: var(--white-100);
    }

    .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
      border-radius: 0.3rem;
      background-color: var(--white-100);
      color: var(--purple-900);
    }

    .react-datepicker__time-container .react-datepicker__time {
      position: relative;
      background: var(--white-100);
      color: var(--purple-900);
      border-bottom-right-radius: 0.3rem;
    }

    .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
      margin-top: 0;
      color: var(--purple-900);
      font-weight: bold;
      font-size: 0.944rem;
    }

    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
      background-color: var(--purple-200);
      color: var(--white-100);
      font-weight: bold;
    }

    .react-datepicker__today-button {
      background: var(--pink-50);
      color: var(--purple-900);
      border-top: 0px;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
      padding: 5px 0;
      clear: left;
    }

    .react-datepicker {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 0.8rem;
      background-color: var(--white-100);
      color: var(--purple-900);
      border: 0px;
      border-radius: 0;
      display: inline-block;
      position: relative;
    }
`;

export const SelectContainer = styled.div<InputProps>`
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

  select {
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

    option {
      background-color: var(--white-100);
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
    background: var(--red-600);
    color: #fff;
    &::before {
      border-color: var(--red-600) transparent;
    }
  }
`;
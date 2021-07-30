import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { Container, SelectContainer, SelectDiv, Error } from "./styles";

import 'react-datepicker/dist/react-datepicker.css';

interface IProps extends Omit<ReactDatePickerProps, 'onChange'> {
  label: string;
  name: string;
}

export function DatePicker({ label, name, ...rest }: IProps) {
  const multiple = true;
  const datepickerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const habdleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!datepickerRef.current?.value);
  }, []);
 
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);
  
  return (
    <Container>
      { label && (<label>{label}</label>) }
      
      <SelectContainer
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <ReactDatePicker
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          showTimeSelect
          // timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MM/dd/yyyy HH:mm a"
          onBlur={habdleSelectBlur}
          onFocus={handlenputFocus}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </SelectContainer>
    </Container>
  );
};
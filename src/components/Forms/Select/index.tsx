import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { Container, SelectContainer, Error } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
  label?: string;
  options: {
    label: string;
    value: string;
  }[]
}

const Select: React.FC<SelectProps> = ({
  name,
  containerStyle = {},
  label,
  options,
  ...rest
}) => {
  const SelectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  
  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const habdleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!SelectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: SelectRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      { label && (<label>{label}</label>) }
      
      <SelectContainer
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <select
          name={name}
          onFocus={handlenputFocus}
          onBlur={habdleSelectBlur}
          defaultValue={defaultValue}
          ref={SelectRef}
          {...rest}
        >
          <option></option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </SelectContainer>
    </Container>
  );
};

export default Select;
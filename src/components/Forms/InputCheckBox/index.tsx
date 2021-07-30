import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useField } from "@unform/core";
import { FiAlertCircle } from "react-icons/fi";

import { Container, InputContainer, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  children: ReactNode;
}

export function InputCheckBox({  
  name,
  containerStyle = {},
  children,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const habdleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <InputContainer
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <input
          name={name}
          onFocus={handlenputFocus}
          onBlur={habdleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          type="checkbox"
          {...rest}
        />
      </InputContainer>
      <label>{children}</label>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputCheckBox;
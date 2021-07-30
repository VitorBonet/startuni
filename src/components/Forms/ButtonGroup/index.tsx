import { useField } from "@unform/core";
import React, {
  InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from "react";

import { Container, Buttons, ButtonsContainer, Button } from "./styles";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object;
  name: string;
  valueDefault: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[]
}

const ButtonGroup: React.FC<RadioProps> = ({
  name,
  containerStyle = {},
  options,
  valueDefault,
  ...rest
}) => {
  const divRef = useRef<HTMLDivElement[]>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [value, setValue] = useState(valueDefault);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // const habdleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRefs.current?.value);
  // }, []);

  function handleClick(val) {
    setValue(val);
  } 

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: divRef.current,
      getValue(refs) {
        return value ? value : null;
      },
    });
  }, [fieldName, registerField, value]);

  return (
    <Container>      
      <Buttons>
        {options?.map((option, key) => (
          <ButtonsContainer
            key={option.id}
            style={containerStyle}
            isErrored={!!error}
            isFocused={isFocused}
            isFilled={isFilled}
          >
          <Button
            // ref={divRef}
            className={`${value === option.value ? 'selected' : ''}`}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </Button>
          </ButtonsContainer>
        ))}
      </Buttons>
      
    </Container>
  );
};

export default ButtonGroup;
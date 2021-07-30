import { useField } from "@unform/core";
import React, {
  InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from "react";

import { Container, Radios, RadioContainer } from "./styles";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object;
  label?: string;
  name: string;
  options: {
    id: string;
    label: string;
    value?: string;
  }[]
}

const RadioButtons: React.FC<RadioProps> = ({
  label,
  name,
  containerStyle = {},
  options,
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // const habdleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRefs.current?.value);
  // }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, id) {
        const item = refs.find(ref => ref.id === id);
        if (item) {
          item.checked = true;
        }
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find(ref => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      { label && (<label>{label}</label>) }
      
      <Radios>
        {options?.map((option, key) => (
          <RadioContainer
            key={key}
            style={containerStyle}
            isErrored={!!error}
            isFocused={isFocused}
            isFilled={isFilled}
          >
          <input
            ref={elRef => (inputRefs.current[key] = elRef)}
            name={name}
            id={option.id}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            type="radio"
          />

          <label>{option.label}</label>
          </RadioContainer>
        ))}
      </Radios>
      
    </Container>
  );
};

export default RadioButtons;
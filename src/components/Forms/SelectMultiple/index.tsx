import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Select from 'react-select';
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import makeAnimated from 'react-select/animated';

import { Container, SelectContainer, SelectDiv, Error } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
  label?: string;
  options: {
    label: string;
    value: string;
  }[]
}

const SelectMultiple: React.FC<SelectProps> = ({
  name,
  containerStyle = {},
  label,
  options,
  ...rest
}) => {
  const multiple = true;
  const SelectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const habdleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!SelectRef.current?.value);
  }, []);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value
    if (!multiple) {
      return selectValue ? selectValue.value : '';
    }
 
    return selectValue ? selectValue.map(option => option.value) : [];
  }
 
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: SelectRef.current,
      path: 'state.value',
      setValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [SelectRef.current, fieldName]); // eslint-disable-line

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      background: "#232129",
      color: '#e1e1e6',
      padding: 20,
    }),
    control: (base, state) => ({
      ...base,
      background: "#232129",
      color: '#e1e1e6',
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: 'transparent',
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#e1e1e6',
      background: "#232129",
      width: '100%'
    }),
  }

  const animatedComponents = makeAnimated();

  return (
    <Container>
      { label && (<label>{label}</label>) }
      
      <SelectContainer
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <SelectDiv>
          <Select
            styles={customStyles}
            name={fieldName}
            aria-label={fieldName}
            options={options}
            isMulti={multiple}
            defaultValue={defaultValue}
            components={animatedComponents}
            ref={SelectRef}
            onFocus={handlenputFocus}
            onBlur={habdleSelectBlur}
            {...rest}
          />
        </SelectDiv>

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </SelectContainer>
    </Container>
  );
};

export default SelectMultiple;
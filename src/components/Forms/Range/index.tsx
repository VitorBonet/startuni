import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useField } from "@unform/core";

import { Container, Title, Labels, InputContainer, Steps, Step, DescriptionTooltip } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  label: string;
  labelStart: string;
  labelEnd: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
}

const Range: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  label,
  labelStart,
  labelEnd,
  description,
  min,
  max,
  step,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [steps, setSteps] = useState([]);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    const stepsAux = [];
    for (let i = 0; i < step; i++) {
      stepsAux.push(1);
    }
    setSteps(stepsAux);
  }, []);

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
      <Title>
        <div>{ label && (<label>{label}</label>) }</div>
        {description && (<DescriptionTooltip title={description}><AiOutlineQuestionCircle /></DescriptionTooltip>)}
      </Title>
      
      <Labels>
        <div>{labelStart}</div>
        <div>{labelEnd}</div>
      </Labels>

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
          type="range"
          min={min ? min : '0'} 
          max={max ? max : '40'} 
          step={step ? step : '5'} 
          {...rest}
        />
      </InputContainer>

      <Steps>
        { step ? steps.map(st => 
          <Step />
        ) : (
          <>
          <Step />
          <Step />
          <Step />
          <Step />
          <Step />
          </>
        ) }
      </Steps>
    </Container>
  );
};

export default Range;
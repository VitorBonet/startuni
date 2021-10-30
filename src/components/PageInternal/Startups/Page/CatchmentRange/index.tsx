import React, {
  InputHTMLAttributes,
  useRef,
} from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { Container, Title, Labels, InputContainer } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object;
  label: string;
  labelStart: string;
  labelEnd: string;
  defaultValue: number;
  description?: string;
  min?: number;
  max?: number;
}

const CatchmentRange: React.FC<InputProps> = ({
  containerStyle = {},
  label,
  labelStart,
  labelEnd,
  defaultValue,
  min,
  max,
  step,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      <Title>
        <div>{ label && (<label>{label}</label>) }</div>
      </Title>

      <InputContainer
        style={containerStyle}
      >
        <input
          disabled
          defaultValue={defaultValue}
          ref={inputRef}
          type="range"
          min={min ? min : '0'} 
          max={max ? max : '100'} 
          {...rest}
        />
      </InputContainer>
      
      <Labels>
        <div>{labelStart}</div>
        <div>{labelEnd}</div>
      </Labels>
    </Container>
  );
};

export default CatchmentRange;
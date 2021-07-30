import React, { ButtonHTMLAttributes } from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Container } from "./styles";

interface ILoadingSpinnerProps {
  visible: boolean;
}

export function LoadingSpinner({ visible }: ILoadingSpinnerProps) {
  return (
    <Container>
      <Loader
          type="Bars"
          color="#b31d25"
          height={80}
          width={80}
          visible={visible}
          //timeout={3000} //3 secs
        />
    </Container>
  );
}
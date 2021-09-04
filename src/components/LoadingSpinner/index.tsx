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
          type="TailSpin"
          color="#8231C7"
          secondaryColor="#FF40F2"
          height={50}
          width={50}
          visible={visible}
          // timeout={3000} //3 secs
        />
    </Container>
  );
}
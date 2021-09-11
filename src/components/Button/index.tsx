import React, { ButtonHTMLAttributes } from "react";
import Loader from "react-loader-spinner";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <Container type="button" {...rest}>
      {loading ? (
        <Loader
          type="ThreeDots"
          color="#e1e1e6"
          height={20}
          width={20}
          visible={true}
          // timeout={3000} //3 secs
        />
      ) : children}
    </Container>
  );
}
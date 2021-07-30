import { useRouter } from "next/router";
import React, { ButtonHTMLAttributes } from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookSquare } from 'react-icons/fa';
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  loading?: boolean;
};

export function ButtonFacebook({ title, loading, ...rest }: ButtonProps) {
  const { addToast } = useToast();
  const { signInFacebook } = useAuth();
  const router = useRouter();

  async function responseFacebook(response) {
    const singIn = await signInFacebook({
      email: response.email,
      id: response.id,
      name: response.name,
      acessToken: response.accessToken
    });
    
    if (singIn.error) {
      addToast({
        type: "error",
        title: "Login error",
        description: "An error occurred, please try again.",
      });
      
      router.push('/login');
      return;
    }
    
    router.push('/feed');
  }

  return (    
    <FacebookLogin
      appId="1279562055775269"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => (
          <Container onClick={renderProps.onClick}  type="button" {...rest}>
            <FaFacebookSquare size={20} />
            {loading ? "Loading..." : title}
          </Container>
      )}
    />
    
  );
}
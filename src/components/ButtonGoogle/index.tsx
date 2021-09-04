import { useRouter } from "next/router";
import React, { ButtonHTMLAttributes } from "react";
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  loading?: boolean;
};

export function ButtonGoogle({ title, loading, ...rest }: ButtonProps) {
  const { addToast } = useToast();
  const { signInGoogle } = useAuth();
  const router = useRouter();

  async function success(response) {
    const singIn = await signInGoogle({
      email: response.profileObj.email,
      id: response.profileObj.googleId,
      name: response.profileObj.name,
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

  function failure(response) {
    addToast({
      type: "error",
      title: "Login Google error",
      description: "we had a problem, try again later",
    });
  }

  return (
    <GoogleLogin
      clientId="258164373274-v9fsnaiatjmde1n9l851se3pmad51vjv.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={success}
      onFailure={failure}
      isSignedIn={false}
      autoLoad={false}
      render={renderProps => (
        <Container onClick={renderProps.onClick} type="button" {...rest}>
          <FcGoogle size={18} />
          {loading ? "Loading..." : title}
        </Container>
      )}
    /> 
  );
}
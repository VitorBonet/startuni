import React, { useRef, useCallback, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiMail, FiLock, FiLogIn} from 'react-icons/fi'

import { 
  Container, 
  LeftContainer,
  LeftHeader,
  LeftBody,
  LeftBodyCntent,
  BodyTitle,
  LinksDiv,
  FormDiv,
  ButtonMidia,
  LeftFooter,
  RightContainer
} from '../styles/login/styles';

import Input from '../components/Forms/Input';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import getValidationErrors from '../utils/getValidationErrors';
import { Button } from '../components/Button';
import { ButtonFacebook } from '../components/ButtonFacebook';
import { ButtonGoogle } from '../components/ButtonGoogle';

interface SingUpFormData {
  email: string;
  password: string;
}

export default function Login() {
  const formRef = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();
  const { signIn } = useAuth();


  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      setRequestLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail required")
            .email("Enter a valid email address"),
          password: Yup.string()
            .required("Password required")
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const login = await signIn({ email: data.email, password: data.password });
        
        if (login.error) {
          switch (login.code) {
            case 'sessions.method.facebook':
              addToast({
                type: "error",
                title: "Login error",
                description: "Your account was created by Facebook, use it to login!",
              });
              break;

            case 'sessions.method.google':
              addToast({
                type: "error",
                title: "Login error",
                description: "Your account was created by Google, use it to login!",
              });
              break;
          
            default:
              addToast({
                type: "error",
                title: "Login error",
                description: "Login ou senha incorreta!",
              });
              break;
          }
          
          router.push('/login');
        } else {
          router.push('/home');
        }
        
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: "error",
            title: "Login error",
            description: "An error occurred, please try again.",
          });
        }
      }
      setRequestLoading(false);
    },
    // [addToast, history]
    [addToast]
  );

  return (
    <>
      <Head>
        <title>Login | StartUni</title>
      </Head>
      <main>
        <Container>
          <LeftContainer>
            <LeftHeader>
              <img src="/rocketIcon.svg" alt="rocket" />
              <div className="titleDiv">
                <h3>StartUni</h3>
                <label>STARTUP UNIVERSE</label>
              </div>
            </LeftHeader>
            <LeftBody>
              <LeftBodyCntent>
                <BodyTitle>
                  <h3>Login na StartUni</h3>
                  <LinksDiv>Não possui conta? <Link href="/join"><a>Criar conta</a></Link></LinksDiv>
                </BodyTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormDiv>
                    <Input name="email" icon={FiMail} label="E-mail" />
                    <Input
                      name="password"
                      icon={FiLock}
                      type="password"
                      label="Senha"
                    />
                    <Button loading={requestLoading} type="submit">Entrar</Button>
                    
                    <ButtonMidia>
                      <ButtonFacebook title="Entrar com Facebook" />
                      <ButtonGoogle title="Entrar com Google" />
                    </ButtonMidia>
                  </FormDiv>
                </Form>
                  
                <LinksDiv><Link href="/forgotPassword"><a>Esqueceu sua senha?</a></Link></LinksDiv>
              </LeftBodyCntent>
            </LeftBody>
            <LeftFooter>
              <label><Link href="/forgotPassword"><a>StartUni © 2021</a></Link></label>

              <label><Link href="/forgotPassword"><a>Política de Privacidade</a></Link></label>
              <label><Link href="/forgotPassword"><a>Termos e Condições</a></Link></label>
            </LeftFooter>
          </LeftContainer>
          <RightContainer>
            <img src="/images/customerSurveyUdw.svg" alt="Product Iteration" />
          </RightContainer>
        </Container>
      </main>
    </>
  );
}
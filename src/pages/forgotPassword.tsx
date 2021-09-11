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

import { api } from '../services/apiClient';

import Input from '../components/Forms/Input';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import getValidationErrors from '../utils/getValidationErrors';
import { Button } from '../components/Button';
import { ButtonFacebook } from '../components/ButtonFacebook';
import { ButtonGoogle } from '../components/ButtonGoogle';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function forgotPassword() {
  const formRef = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();


  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      setRequestLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Password is required"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, confirmPassword } = data;
        console.log(router.query);
        const token = router.query.token;

        if (!token) {
          throw new Error();
        }

        await api.post("/password/reset", {
          password,
          confirmPassword,
          token,
        });

        router.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: "error",
            title: "Erro na renovação de senha",
            description:
              "Ocorreu um erro inesperado, tente novamente mais tarde.",
          });
        }
      }
      setRequestLoading(false);
    },
    [addToast, router.query]
  );

  return (
    <>
      <Head>
        <title>Reset Password | StartUni</title>
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
                  <h3>Alterar senha</h3>
                </BodyTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormDiv>
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        label="Password"
                      />
                      <Input
                        name="confirmPassword"
                        icon={FiLock}
                        type="password"
                        label="Confirm Password"
                      />
                    <Button loading={requestLoading} type="submit">Alterar</Button>
                  </FormDiv>
                </Form>
                  
              </LeftBodyCntent>
            </LeftBody>
            <LeftFooter>
              <label><Link href="/forgotPassword"><a>StartUni © 2021</a></Link></label>

              <label><Link href="/forgotPassword"><a>Política de Privacidade</a></Link></label>
              <label><Link href="/forgotPassword"><a>Termos e Condições</a></Link></label>
            </LeftFooter>
          </LeftContainer>
          <RightContainer>
            <img src="/images/secureLoginUdw.svg" alt="Secure Login" />
          </RightContainer>
        </Container>
      </main>
    </>
  );
}
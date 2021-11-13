import React, { useRef, useCallback, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiLogIn} from 'react-icons/fi'

import { 
  Container, 
  LeftContainer,
  RightContainer,
  RightHeader,
  RightBody,
  RightBodyCntent,
  BodyTitle,
  LinksDiv,
  FormDiv,
  InputCheckBoxText,
  ButtonMidia,
  RightFooter,
} from '../styles/join/styles';

import { api } from '../services/apiClient';

import Input from '../components/Forms/Input';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import getValidationErrors from '../utils/getValidationErrors';
import { Button } from '../components/Button';
import { ButtonFacebook } from '../components/ButtonFacebook';
import { ButtonGoogle } from '../components/ButtonGoogle';
import InputCheckBox from '../components/Forms/InputCheckBox';
import { DatePicker } from '../components/Forms/DatePicker';

interface ISingUpFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export default function Join() {
  const formRef = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const [checkBoxAgreeTermsUse, setCheckBoxAgreeTermsUse] = useState('false');
  const [checkBoxAgreePrivacyPolicy, setCheckBoxAgreePrivacyPolicy] = useState('false');

  const handleAgreeTermsUse = () => {
    let value = 'true';
    if(checkBoxAgreeTermsUse === 'true') {
      value = 'false';
    }
    setCheckBoxAgreeTermsUse(value);
  }

  const handleAgreePrivacyPolicy = () => {
    let value = 'true';
    if(checkBoxAgreePrivacyPolicy === 'true') {
      value = 'false';
    }
    setCheckBoxAgreePrivacyPolicy(value);
  }

  const handleSubmit = useCallback(
    async (data: ISingUpFormData) => {
      setRequestLoading(true);
      try {
        formRef.current?.setErrors({});

        const stringRequiredField = 'Campo obrigatório';

        const schema = Yup.object().shape({
          name: Yup.string().required(stringRequiredField),
          email: Yup.string()
            .required(stringRequiredField)
            .email("Entrar com e-mail válido"),
          password: Yup.string().min(6, "Mínimo 6 dígitos"),
          confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
          birthDate: Yup.date().required(stringRequiredField),
          agreeTermsUse: Yup.string().oneOf(['true'], 'Confirme que você concorda com os termos de uso'),
          agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirme que você concorda com a política de privacidade'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataSend: ISingUpFormData = {
          name: data.name,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
        }
        
          const response = await api.post("/users", dataSend);
          addToast({
            type: "success",
            title: "Cadastrado",
            description: "Cadastro realizado com sucesso.",
          });

          router.push("/login");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          switch (err.data.code) {
            case 'users.create.exists':
              addToast({
                type: "error",
                title: "Erro no cadastro",
                description: "Já existe uma conta com esse e-mail.",
              });
              
              break;
          
            default:
              addToast({
                type: "error",
                title: "Erro no cadastro",
                description: "Ocorreu um erro inesperado, tente novamente mais tarde.",
              });
              break;
          }
          
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
        <title>Cadastro | StartUni</title>
      </Head>
      <main>
        <Container>
          <LeftContainer>
            <img src="/images/RoomIllustration.svg" alt="RoomIllustration" />
          </LeftContainer>

          <RightContainer>
            <RightHeader>
              <Link href="/">
              <>
                <img src="/rocketIcon.svg" alt="rocket" />
                <div className="titleDiv">
                  <h3>StartUni</h3>
                  <label>STARTUP UNIVERSE</label>
                </div>
              </>
              </Link>
            </RightHeader>
            <RightBody>
              <RightBodyCntent>
                <BodyTitle>
                  <h3>Criar conta na StartUni</h3>
                  <LinksDiv>Já possui conta? <Link href="/login"><a>Clique aqui</a></Link></LinksDiv>
                </BodyTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormDiv>                    
                    <ButtonMidia>
                      <ButtonFacebook title="Entrar com Facebook" />
                      <ButtonGoogle title="Entrar com Google" />
                    </ButtonMidia>

                    <Input name="name" icon={FiUser} label="Nome" />
                    <Input name="email" icon={FiMail} label="E-mail" />
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
                      label="Confirmação de senha"
                    />
                    <DatePicker 
                      name="birthDate"
                      label="Data de Nascimento"
                    />
                    <InputCheckBox
                        name="agreeTermsUse"
                        value={checkBoxAgreeTermsUse}
                        onClick={handleAgreeTermsUse}
                      >
                        <InputCheckBoxText>Eu concordo com os <a href="/content/terms-of-use" target="_blank">Termos de Uso</a></InputCheckBoxText>
                    </InputCheckBox>
                    <InputCheckBox
                        name="agreePrivacyPolicy"
                        value={checkBoxAgreePrivacyPolicy}
                        onClick={handleAgreePrivacyPolicy}
                      >
                      <InputCheckBoxText>Eu concordo com a <a href="/content/privacy" target="_blank">Política de Privacidade</a></InputCheckBoxText>
                    </InputCheckBox>

                    <Button loading={requestLoading} type="submit">Criar conta</Button>
                  </FormDiv>
                </Form>
              </RightBodyCntent>
            </RightBody>
            <RightFooter>
              <label><Link href="/forgotPassword"><a>StartUni © 2021</a></Link></label>
            </RightFooter>
          </RightContainer>
        </Container>
      </main>
    </>
  );
}
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiLogIn} from 'react-icons/fi'
import { AiOutlineDoubleRight} from 'react-icons/ai'
import { IoIosRocket} from 'react-icons/io'

import { 
  Body, 
  Content,
  LeftContainer,
  RightContainer,
  RightHeader,
  TimeLineHeaderDiv,
  TimeLineHeader,
  TimeLineItem,
  TimeLineBall,
  RightBody,
  RightBodyCntent,
  BodyTitle,
  FormDiv,
  Buttons,
  InputCheckBoxText,
  RightFooter,
} from '../../styles/startups/join/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../components/Cards/StartupCard';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import getValidationErrors from '../../utils/getValidationErrors';
import { ButtonFacebook } from '../../components/ButtonFacebook';
import { ButtonGoogle } from '../../components/ButtonGoogle';
import Input from '../../components/Forms/Input';
import { DatePicker } from '../../components/Forms/DatePicker';
import InputCheckBox from '../../components/Forms/InputCheckBox';
import { Button } from '../../components/Button';
import Select from '../../components/Forms/Select';
import { TextArea } from '../../components/Forms/TextArea';

interface ISingUpFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export default function Join() {const formRef = useRef<FormHandles>(null);
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

        const schema = Yup.object().shape({
          name: Yup.string().required("Name required"),
          email: Yup.string()
            .required("E-mail required")
            .email("Enter a valid email address"),
          password: Yup.string().min(6, "At least 6 digits"),
          confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
          birthDate: Yup.date().required(),
          agreeTermsUse: Yup.string().oneOf(['true'], 'Confirm that you agree to the terms of use'),
          agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirm that you agree to the privacy of policy'),
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
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          switch (err.code) {
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
      <PrivatePage title="Nova Startup | StartUni" withLeftBar={false} withHeader={false}>
        <Body>
          <Content>
            <LeftContainer>
              <img src="/images/toTheMoon.svg" alt="toTheMoon" />
            </LeftContainer>

            <RightContainer>
              <RightHeader>
                <img src="/rocketIcon.svg" alt="rocket" />
                <div className="titleDiv">
                  <h3>StartUni</h3>
                  <label>STARTUP UNIVERSE</label>
                </div>
              </RightHeader>

              <TimeLineHeaderDiv>
                <TimeLineHeader>
                  <TimeLineItem className="active">
                    <h6>Start</h6>
                    <TimeLineBall className="active" />
                  </TimeLineItem>
                  <TimeLineItem>
                    <h6>Start</h6>
                    <TimeLineBall />
                  </TimeLineItem>
                  <TimeLineItem>
                    <h6>Start</h6>
                    <TimeLineBall />
                  </TimeLineItem>
                  <TimeLineItem>
                    <h6>Start</h6>
                    <TimeLineBall />
                  </TimeLineItem>
                </TimeLineHeader>
              </TimeLineHeaderDiv>

              <RightBody>
                <RightBodyCntent>
                  <BodyTitle>
                    <h3>Nova StartUp</h3>
                  </BodyTitle>

                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormDiv>         
                      <Input name="name" icon={IoIosRocket} label="Nome" />
                      <Input name="shortDescription" icon={IoIosRocket} label="Descrição curta" />
                      <TextArea  name="description" label="Descrição" />
                        
                      <Select name="state" options={[]} label="Estado" />
                      <Select name="city" options={[]} label="Cidade Sede" />
                      <DatePicker 
                        name="fundationDate"
                        label="Ano de fundação"
                      />

                      <Select 
                        name="phase" 
                        options={[ 
                          { label: 'Aceleração', value: '1' },
                          { label: 'Inestimento Anjo', value: '2' },
                          { label: 'Pré-Seed', value: '3' },
                          { label: 'Seed', value: '4' },
                          { label: 'Série A', value: '5' },
                          { label: 'Nenhuma das anteriores', value: '6' },
                        ]} 
                        label="Estágio atual" 
                      />
                      
                      <Select 
                        name="businessModel" 
                        options={[ 
                          { label: 'Assinatura', value: '1' },
                          { label: 'Ecommerce', value: '2' },
                          { label: 'Venda de Serviço', value: '3' },
                          { label: 'Venda de Produto', value: '4' },
                          { label: 'Marketplace', value: '5' },
                          { label: 'Consultoria', value: '6' },
                          { label: 'Intermediação', value: '7' },
                          { label: 'Outros', value: '8' },
                        ]} 
                        label="Modelo de Negócio" 
                      />
                      
                      <Select 
                        name="segment" 
                        options={[ 
                          { label: 'Edtech', value: '1' },
                          { label: 'Ecommerce', value: '2' },
                          { label: 'Venda de Serviço', value: '3' },
                          { label: 'Venda de Produto', value: '4' },
                          { label: 'Marketplace', value: '5' },
                          { label: 'Consultoria', value: '6' },
                          { label: 'Intermediação', value: '7' },
                          { label: 'Outros', value: '8' },
                         ]} 
                        label="Segmento do negócio" 
                      />

                      <Buttons>

                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Avançar <AiOutlineDoubleRight /></Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                </RightBodyCntent>
              </RightBody>
              <RightFooter>
                <label><Link href="/forgotPassword"><a>StartUni © 2021</a></Link></label>
              </RightFooter>
            </RightContainer>
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}
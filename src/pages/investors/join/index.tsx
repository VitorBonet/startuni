import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { format } from 'date-fns';
import { AiOutlinePhone, AiOutlinePercentage } from 'react-icons/ai';
import { IoIosRocket, IoMdGlobe } from 'react-icons/io';
import { FiAlertTriangle } from 'react-icons/fi';
import { BsBarChart, BsCardText } from 'react-icons/bs';
import { MdAttachMoney, MdComputer } from 'react-icons/md';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';

import { 
  Body, 
  Content,
  LeftContainer,
  LeftHeader,
  LeftBody,
  LeftBodyContent,
  RightContainer,
  TimeLineHeaderDiv,
  TimeLineHeader,
  TimeLineItem,
  TimeLineBall,
  BodyTitle,
  FormDiv,
  Buttons,
  InputCheckBoxText,
  LeftFooter,
  InfoLine,
  ContainerInfoLine,
  ContainerInfoLineText,
} from '../../../styles/investors/join/styles';

import { PrivatePage } from '../../../components/PrivatePage';
import { useToast } from '../../../contexts/ToastContext';
import { api } from '../../../services/apiClient';
import { DatePicker } from '../../../components/Forms/DatePicker';
import { Button } from '../../../components/Button';
import { TextArea } from '../../../components/Forms/TextArea';
import Input from '../../../components/Forms/Input';
import UploadInput from '../../../components/Forms/UploadInput';
import Select from '../../../components/Forms/Select';
import InputCheckBox from '../../../components/Forms/InputCheckBox';

interface IState {
  id: number;
  name: string;
}

interface ICity {
  label: string;
  value: string;
}

interface ICountry {
  label: string;
  value: string;
}

interface IJoinFormData {
  description: string;
  cpf: number;
  rg: number;
  maritalStatus: number;
  genre: number;
  DDI: number;
  phone: number;
  cep: number;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  cityId: number;
  stateId: number;
  countryId: number;
  occupation: string;
  office: number;
  companyName: string;
  appear: boolean;
  politicallyExposed: boolean;
}

interface IJoinProps {
  states: IState[];
}

export default function Join({states}: IJoinProps) {const formRef = useRef<FormHandles>(null);
  const formRef1 = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [statesSelect, setStatesSelect] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { addToast } = useToast();

  const act = router.query.act;

  const [checkBoxAppear, setCheckBoxAppear] = useState('true');
  const [checkBoxPoliticallyExposed, setCheckBoxPoliticallyExposed] = useState('false');

  async function getCities(stateId) {
    await api.get(`/countries/states/${stateId}/cities`).then(response => {
      const cities = [];
      const promiseRes = response.data?.map(city => {
        cities.push({ label: city.name, value: city.id});
      });

      Promise.all(promiseRes);

      setCities(cities);

      // if (profile?.state) {
      //   formRef.current.setFieldValue('state', profile.state);
      // }
    }).catch((err) => { console.log(err); });
  }

  async function handleStates(e) {
    const stateId = e.target.value;
    getCities(stateId);
  }  

  const handleAppear = () => {
    let value = 'true';
    if(checkBoxAppear === 'true') {
      value = 'false';
    }
    setCheckBoxAppear(value);
  }

  const handlePoliticallyExposed = () => {
    let value = 'true';
    if(checkBoxPoliticallyExposed === 'true') {
      value = 'false';
    }
    setCheckBoxPoliticallyExposed(value);
  }

  useEffect(() => {
      api.get('/countries/33/states').then(response => {
        const statesRes = response.data;
        statesRes?.map(state => {
          statesSelect.push({ label: state.name, value: state.id});
        });
      }).catch((err) => { console.log(err); });
  }, []);

  const handleSubmit1 = useCallback(
    async (data: IJoinFormData) => {
      try {
        formRef1.current?.setErrors({});

        const requiredText = "Campo é obrigatório";

        const schema = Yup.object().shape({
          description: Yup.string(),
          cpf: Yup.string().required(requiredText),
          rg: Yup.string().required(requiredText),
          maritalStatus: Yup.string().required(requiredText),
          genre: Yup.string().required(requiredText),
          DDI: Yup.string().required(requiredText),
          phone: Yup.string().required(requiredText),
          cep: Yup.string().required(requiredText),
          street: Yup.string().required(requiredText),
          number: Yup.string().required(requiredText),
          complement: Yup.string(),
          neighborhood: Yup.string().required(requiredText),
          cityId: Yup.string().required(requiredText),
          stateId: Yup.string().required(requiredText),
          countryId: Yup.string().required(requiredText),
          occupation: Yup.string().required(requiredText),
          office: Yup.string(),
          companyName: Yup.string(),
          appear: Yup.string(),
          politicallyExposed: Yup.string(),
        });
        
        await schema.validate(data, {
          abortEarly: false,
        });

        data.appear = checkBoxAppear === 'true' ? true : false;
        data.politicallyExposed = checkBoxPoliticallyExposed === 'true' ? true : false;
        

        const response = await api.post(`/investors`, data);
          
        // if (response.status !== 200) {
        //   throw new Error("");          
        // }

        addToast({
          type: "success",
          title: "Perfil de investidor criado!",
          description:
            "Seu perfil de investidor foi criado com sucesso.",
        });

        if (act === 'match') {
          router.push(`/startups/${router.query.code}`);
        } else {
          router.push('/investors/me');
        }
        
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = {};
          
          error.inner.forEach(error => {
            validationErrors[error.path] = error.message;
            console.log(error);
          });
          formRef1.current.setErrors(validationErrors);
        }
      }
    },
    // [addToast, history]
    [addToast]
  );

  return (
    <>
      <PrivatePage title="Novo Investidor | StartUni" withLeftBar={false} withHeader={false}>
        <Body>
          <Content>
            <LeftContainer>
              <LeftHeader>
                <Link href="/startups" replace>
                <>
                  <img src="/rocketIcon.svg" alt="rocket" />
                  <div className="titleDiv">
                    <h3>StartUni</h3>
                    <label>STARTUP UNIVERSE</label>
                  </div>
                </>
                </Link>
              </LeftHeader>
              <LeftBody>
                <LeftBodyContent>
                  <BodyTitle>
                    <h3>Dados do investidor</h3>
                    
                    <InfoLine className="leftMargin">
                      <ContainerInfoLine>
                        <ContainerInfoLineText><FiAlertTriangle /> É importante manter seus dados corretos e atualizados, pois eles podem ser auditados a qualquer momento e serão utilizados para redação de seus contratos.
                        </ContainerInfoLineText>
                      </ContainerInfoLine>
                    </InfoLine>
                  </BodyTitle>

                  <Form ref={formRef1} onSubmit={handleSubmit1}>
                    <FormDiv>  
                      <Input 
                        type="number"
                        name="cpf" 
                        icon={FiUsers} 
                        label="CPF *" 
                      /> 

                      <Input 
                        type="number"
                        name="rg" 
                        icon={FiUsers} 
                        label="RG *" 
                      />

                      <Select 
                        name="maritalStatus" 
                        icon={BsBarChart}
                        options={[ 
                          { label: 'Solteiro(a)', value: '1' },
                          { label: 'Casado(a)', value: '2' },
                          { label: 'Divorciado(a)', value: '3' },
                          { label: 'Viúvo(a)', value: '4' },
                        ]} 
                        label="Estado Civil *" 
                      />

                      <Select 
                        name="genre" 
                        icon={BsBarChart}
                        options={[ 
                          { label: 'Masculino', value: '1' },
                          { label: 'Feminino', value: '2' },
                        ]} 
                        label="Gênero *" 
                      />
                       
                      <TextArea  name="description" label="Sobre" />

                      <Select 
                        name="DDI" 
                        icon={AiOutlinePhone}
                        defaultValue="55"
                        options={[ 
                          { label: 'Brasil (+55)', value: '55' },
                        ]} 
                        label="DDI *" 
                      />
                      
                      <Input 
                        type="number"
                        name="phone" 
                        icon={AiOutlinePhone} 
                        label="Telefone *" 
                      /> 

                      <Select 
                        name="countryId" 
                        icon={IoMdGlobe}
                        defaultValue="33"
                        options={[ 
                          { label: 'Brasil', value: '33' },
                        ]} 
                        label="Nacionalidade *" 
                      />

                      <Select name="stateId" icon={IoMdGlobe} options={statesSelect} onClick={handleStates} label="Estado" />
                      <Select name="cityId" icon={IoMdGlobe} options={cities} label="Cidade" />

                      <Input 
                        type="number"
                        name="cep" 
                        icon={IoMdGlobe} 
                        label="CEP *" 
                      /> 
                      
                      <Input 
                        type="text"
                        name="street" 
                        icon={IoMdGlobe} 
                        label="Rua *" 
                      /> 
                      
                      <Input 
                        type="number"
                        name="number" 
                        icon={IoMdGlobe} 
                        label="Número *" 
                      /> 
                      
                      <Input 
                        type="text"
                        name="complement" 
                        icon={IoMdGlobe} 
                        label="Complemento" 
                      /> 

                      <Input 
                        type="text"
                        name="neighborhood" 
                        icon={IoMdGlobe} 
                        label="Bairro *" 
                      /> 
                      
                      <Input 
                        type="text"
                        name="occupation" 
                        icon={HiOutlineOfficeBuilding} 
                        label="Ocupação *" 
                      /> 
                      
                      <Select 
                        name="office" 
                        icon={HiOutlineOfficeBuilding}
                        options={[ 
                          { label: 'Estudante', value: '1' },
                          { label: 'Estagiário', value: '2' },
                          { label: 'Assistente / Auxiliar', value: '3' },
                          { label: 'Autônomo', value: '4' },
                          { label: 'Analista / Técnico', value: '5' },
                          { label: 'Coordenador', value: '6' },
                          { label: 'Gerente / Gestor', value: '7' },
                          { label: 'Consultor', value: '8' },
                          { label: 'Diretor', value: '9' },
                          { label: 'Presidente / CEO', value: '10' },
                        ]} 
                        label="Cargo" 
                      />
                      
                      <Input 
                        type="text"
                        name="companyName" 
                        icon={HiOutlineOfficeBuilding} 
                        label="Nome da empresa" 
                      /> 

                      <InputCheckBox
                        name="appear"
                        value={checkBoxAppear}
                        onClick={handleAppear}
                      ><InputCheckBoxText>Eu concordo em exibir meus dados como investidor</InputCheckBoxText>
                      </InputCheckBox>

                        
                      <InputCheckBox
                        name="politicallyExposed"
                        value={checkBoxPoliticallyExposed}
                        onClick={handlePoliticallyExposed}
                      ><InputCheckBoxText>Sou uma pessoa politicamente exposta</InputCheckBoxText>
                      </InputCheckBox>

                      <Buttons>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Salvar </Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                </LeftBodyContent>
              </LeftBody>

              <LeftFooter>
                <label><Link href="/"><a>StartUni © 2021</a></Link></label>
              </LeftFooter>
            </LeftContainer>

            <RightContainer>
                <div>
                  <img src="/images/undraw_personal_finance_tqcd.svg" alt="toTheMoon" />
                </div>
            </RightContainer>
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}

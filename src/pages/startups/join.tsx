import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiLogIn} from 'react-icons/fi';
import { AiOutlineDoubleRight, AiOutlineNodeIndex, AiOutlinePercentage } from 'react-icons/ai';
import { IoIosRocket, IoMdGlobe } from 'react-icons/io';
import { BsBarChart, BsCardText } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';


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
import UploadInput from '../../components/Forms/UploadInput';
import { DatePicker } from '../../components/Forms/DatePicker';
import InputCheckBox from '../../components/Forms/InputCheckBox';
import { Button } from '../../components/Button';
import Select from '../../components/Forms/Select';
import { TextArea } from '../../components/Forms/TextArea';
import { setupAPIClient } from '../../services/api';
import { GetServerSideProps } from 'next';
import Range from '../../components/Forms/Range';

interface IState {
  id: number;
  name: string;
}

interface ICity {
  label: string;
  value: string;
}

interface ISingUpFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

interface IJoinProps {
  states: IState[];
}

interface IStartup {
  icon: File;
  name: string;
  shortDescription: string;
  description: string;
  state: string;
  city: string;
  fundationDate: string;
  phase: string;
  businessModel: string;
  segment: string;
  clientsNumber: number;
  partnersNumber: number;
  pitch: File;
  
  MRR: number;
  ARR: number;
  ARRSummed: number;
  breakeven: string;
  negativeMonthlyMargin: number;
  positiveMonthlyMargin: number;
  searchInvestment: string;
  valueCapture: number;
  equityPercentage: number;
  timeBreakevenAfterInvestment: string;
  manyMonthsInvestmentLast: string;
  
  operationalPhase: string;
  cac: string;
  ltv: string;
  salesCycle: string;
  churn: string;
  marketSize: string;
  scalePotential: string;
  futureSale: string;
  pmf: string;
  governance: string;
  solveProblem: string;
  competitiveDifferential: string;
  mentors: string;
  fullTimeFounders: string;
  
  regulatoryRisk: string;
  competition: string;
  abilityDeliverPromises: string;
  ownTechnology: string;
  riskConflictFounders: string;
  professionalManagement: string;
  politicalRisk: string;
  legalRisk: string;
}

export default function Join({states}: IJoinProps) {const formRef = useRef<FormHandles>(null);
  const formRef1 = useRef<FormHandles>(null);
  const formRef2 = useRef<FormHandles>(null);
  const formRef3 = useRef<FormHandles>(null);
  const formRef4 = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [statesSelect, setStatesSelect] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { addToast } = useToast();

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

  useEffect(() => {
    // let countriesSelect = [];
    if (states) {
      states?.map(state => {
        statesSelect.push({ label: state.name, value: state.id});
      });
    }
  }, []);

  function handleBackStage() {
    let backStage = stage - 1;

    setStage(backStage);
    window.scrollTo(0, 0);
  }

  function changeStage(stage) {
    setStage(stage);
    window.scrollTo(0, 0);
  }

  const handleSubmit1 = useCallback(
    async (data: IStartup) => {
      try {
        formRef1.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório"),
          shortDescription: Yup.string().required("Descrição curta é obrigatório"),
          description: Yup.string().required("Description é obrigatório"),
          state: Yup.string().required("Estado é obrigatório"),
          city: Yup.string().required("Cidade é obrigatório"),
          fundationDate: Yup.date().required(),
          phase: Yup.string().required("Campo é obrigatório"),
          businessModel: Yup.string().required("Campo é obrigatório"),
          segment: Yup.string().required("Campo é obrigatório"),
          clientsNumber: Yup.number().required("Campo é obrigatório"),
          partnersNumber: Yup.number().required("Campo é obrigatório"),
          // birthDate: Yup.date().required(),
          // agreeTermsUse: Yup.string().oneOf(['true'], 'Confirm that you agree to the terms of use'),
          // agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirm that you agree to the privacy of policy'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      
        changeStage(2);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = {};
          
          error.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef1.current.setErrors(validationErrors);
        }
      }
    },
    // [addToast, history]
    [addToast]
  );
  
  const handleSubmit2 = useCallback(
    async (data: ISingUpFormData) => {
      // formRef.current?.setErrors({});

      // const schema = Yup.object().shape({
      //   name: Yup.string().required("Name required"),
      //   email: Yup.string()
      //     .required("E-mail required")
      //     .email("Enter a valid email address"),
      //   password: Yup.string().min(6, "At least 6 digits"),
      //   confirmPassword: Yup.string()
      //   .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      //   birthDate: Yup.date().required(),
      //   agreeTermsUse: Yup.string().oneOf(['true'], 'Confirm that you agree to the terms of use'),
      //   agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirm that you agree to the privacy of policy'),
      // });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });
    
      changeStage(3);
    },
    // [addToast, history]
    [addToast]
  );
  
  
  const handleSubmit3 = useCallback(
    async (data: ISingUpFormData) => {
      formRef.current?.setErrors({});

      // const schema = Yup.object().shape({
      //   name: Yup.string().required("Name required"),
      //   email: Yup.string()
      //     .required("E-mail required")
      //     .email("Enter a valid email address"),
      //   password: Yup.string().min(6, "At least 6 digits"),
      //   confirmPassword: Yup.string()
      //   .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      //   birthDate: Yup.date().required(),
      //   agreeTermsUse: Yup.string().oneOf(['true'], 'Confirm that you agree to the terms of use'),
      //   agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirm that you agree to the privacy of policy'),
      // });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });
      
      changeStage(4);
    },
    // [addToast, history]
    [addToast]
  );

  const handleSubmit4 = useCallback(
    async (data: ISingUpFormData) => {
      setRequestLoading(true);
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
              <div>
                <img src="/images/toTheMoon.svg" alt="toTheMoon" />
              </div>
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
                  <TimeLineItem className={ stage >= 1 && ("active")}>
                    <h6>Start</h6>
                    <TimeLineBall className={ stage >= 1 && ("active")} />
                  </TimeLineItem>
                  <TimeLineItem className={ stage >= 2 && ("active")}>
                    <h6>Finanças</h6>
                    <TimeLineBall className={ stage >= 2 && ("active")} />
                  </TimeLineItem>
                  <TimeLineItem className={ stage >= 3 && ("active")}>
                    <h6>Scorecard</h6>
                    <TimeLineBall className={ stage >= 3 && ("active")}/>
                  </TimeLineItem>
                  <TimeLineItem className={ stage >= 4 && ("active")}>
                    <h6>Fatores de Risco</h6>
                    <TimeLineBall className={ stage >= 4 && ("active")}/>
                  </TimeLineItem>  
                </TimeLineHeader>
              </TimeLineHeaderDiv>

              <RightBody>
                <RightBodyCntent>
                  {stage === 1 && (
                  <>
                  <BodyTitle>
                    <h3>Nova StartUp</h3>
                  </BodyTitle>

                  <Form ref={formRef1} onSubmit={handleSubmit1}>
                    <FormDiv>         
                      <UploadInput 
                        name="icon"
                        accept="image/JPG, image/JPEG, image/PNG"
                        // title="Icone" 
                        type="image"
                        size="icon"
                      />
                      <Input name="name" icon={IoIosRocket} label="Nome" />
                      <Input name="shortDescription" icon={BsCardText} label="Descrição curta" />
                      <TextArea  name="description" label="Descrição" />
                        
                      <Select name="state" icon={IoMdGlobe} options={statesSelect} onClick={handleStates} label="Estado" />
                      <Select name="city" icon={IoMdGlobe} options={cities} label="Cidade Sede" />
                      <DatePicker 
                        name="fundationDate"
                        label="Data de fundação"
                      />

                      <Select 
                        name="phase" 
                        icon={BsBarChart}
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
                        icon={MdAttachMoney}
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
                        icon={AiOutlineNodeIndex}
                        options={[ 
                          {label:'Edtech', value:'1'},
                          {label:'Martech', value:'2'},
                          {label:'Fintech', value:'3'},
                          {label:'Insurtech', value:'4'},
                          {label:'Healthtech', value:'5'},
                          {label:'Retailtech', value:'6'},
                          {label:'Foodtech', value:'7'},
                          {label:'Construtech', value:'8'},
                          {label:'Sportech', value:'9'},
                          {label:'Imobitech', value:'10'},
                          {label:'Mobtech', value:'11'},
                          {label:'Govtech', value:'12'},
                          {label:'Autotech', value:'13'},
                          {label:'Energytech', value:'14'},
                          {label:'Agrotech', value:'15'},
                          {label:'Entretenimento', value:'16'},
                          {label:'Big Data e Analytics', value:'17'},
                          {label:'Hrtechs', value:'18'},
                          {label:'Telecom', value:'19'},
                          {label:'Outros', value:'20'},
                         ]} 
                        label="Segmento do negócio" 
                      />

                      
                      <Input 
                        type="number"
                        defaultValue="0"
                        name="clientsNumber" 
                        icon={FiUsers} 
                        label="Número de clientes" 
                      />

                      
                      <Input 
                        type="number"
                        defaultValue="0"
                        name="partnersNumber" 
                        icon={FiUsers} 
                        label="Número de parceiros" 
                      />

                      <UploadInput 
                        name="pitch"
                        accept="file/PDF"
                        title="Anexe seu pitch (.pdf)" 
                        type="file"
                        size="file"
                      />

                      <Buttons>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Avançar <AiOutlineDoubleRight /></Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                  </>
                  )}

                  {stage === 2 && (
                  <>
                  <BodyTitle>
                    <h3>Informações financeiras</h3>
                  </BodyTitle>

                  <Form ref={formRef2} onSubmit={handleSubmit2}>
                    <FormDiv>
                      <Input 
                        type="number"
                        defaultValue="0"
                        name="MRR" 
                        icon={MdAttachMoney} 
                        label="Receita bruta mensal (MRR)" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="ARR" 
                        icon={MdAttachMoney} 
                        label="Receita bruta que teve somada nos últimos 12 meses (ARR)" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="ARRSummed" 
                        icon={MdAttachMoney} 
                        label="Receita bruta somada para os próximos 12 meses? (sem contar com investimento externo)" 
                      />

                      <Select 
                        name="breakeven" 
                        icon={BsBarChart}
                        options={[ 
                          {label:'Sim, já foi atingido', value:'1'},
                          {label:'Atingiremos em menos de 6 meses', value:'2'},
                          {label:'Atingiremos 7 a 12 meses', value:'3'},
                          {label:'Atingiremos 12 a 18 meses', value:'4'},
                          {label:'Atingiremos 19 a 24 meses', value:'5'},
                          {label:'Atingiremos m mais de 24 meses', value:'6'},
                         ]} 
                        label="Ponto de equilibrio - Breakeven (receita maior ou igual a despesa)" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="negativeMonthlyMargin" 
                        icon={MdAttachMoney} 
                        label="Valor margem mensal negativa (despesa maior que a receita)" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="positiveMonthlyMargin" 
                        icon={MdAttachMoney} 
                        label="Valor margem mensal positiva (despesa menor que a receita)" 
                      />
                      
                      <Select 
                        name="searchInvestment" 
                        icon={BsBarChart}
                        options={[ 
                          {label:'Sim, estou em captação', value:'1'},
                          {label:'Ainda não, mas pretendo em breve', value:'2'},
                          {label:'Não', value:'3'},
                        ]} 
                        label="Atualmente está procurando investimento?" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="valueCapture" 
                        icon={MdAttachMoney} 
                        label="Qual o valor que pretende captar?" 
                      />

                      <Input 
                        type="number"
                        defaultValue="0"
                        name="equityPercentage" 
                        icon={AiOutlinePercentage} 
                        label="Percentual de equity para o investidor?" 
                      />

                      <Select 
                        name="timeBreakevenAfterInvestment" 
                        icon={BsBarChart}
                        options={[ 
                          {label:'Vamos continuar no Breakeven', value:'1'},
                          {label:'Menos de 6 meses', value:'2'},
                          {label:'De 7 a 12 meses', value:'3'},
                          {label:'De 12 a 18 meses', value:'4'},
                          {label:'De 19 a 24 meses', value:'5'},
                          {label:'Mais de 24 meses', value:'6'},
                        ]} 
                        label="Meses para sua Startup atinger o Breakeven depois do investimento" 
                      />

                      <Select 
                        name="manyMonthsInvestmentLast" 
                        icon={BsBarChart}
                        options={[ 
                          {label:'Menos de 6 meses', value:'1'},
                          {label:'De 7 a 12 meses', value:'2'},
                          {label:'De 12 a 18 meses', value:'3'},
                          {label:'De 19 a 24 meses', value:'4'},
                          {label:'Mais de 24 meses', value:'5'},
                        ]} 
                        label="Quantos meses vai durar esse investimento?" 
                      />

                      <Buttons>
                        <a style={{ maxWidth: '100px' }} type="submit" onClick={handleBackStage}>Voltar</a>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Avançar <AiOutlineDoubleRight /></Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                  </>
                  )}
                  {stage === 3 && (
                  <>
                  <BodyTitle>
                    <h3>Scorecard</h3>
                  </BodyTitle>

                  <Form ref={formRef3} onSubmit={handleSubmit3}>
                    <FormDiv className="formSpaceRange">
                      <Select 
                          name="operationalPhase" 
                          icon={AiOutlineNodeIndex}
                          options={[ 
                            {label:'Ideação', value:'1'},
                            {label:'Planejamento', value:'2'},
                            {label:'Validação', value:'3'},
                            {label:'Operação', value:'4'},
                            {label:'Tração', value:'5'},
                          ]} 
                          label="Estágio operacional" 
                      />

                      <Range 
                        name="cac" 
                        label="Custo de Aquisição de Clientes (CAC)" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                        description="CAC é o custo de aquisição por cliente, para calcular divida a soma dos investimentos para adquirir um cliente pelo numero de cliente já conquistados por um período de tempo. 
                                    Alto = Quando os gastos para trazer o cliente é maior que a receita que ele gera para a empresa;
                                    Neutro = Equilibrado;
                                    Baixo = Quando os gastos para trazer o cliente é menor que a receita que ele gera para a empresa;"
                      />

                      <Range 
                        name="ltv" 
                        label="Lifetime Value (LTV)" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                        description="O Life Time Value é o valor que um cliente retorna ao decorrer do tempo, sendo assim o LTV mostra o faturamento obtido com o cliente durante determinado período de tempo. 
                                      Para calcular: LTV = Ticket médio das vendas X número de compras do cliente ao decorrer do tempo. "
                      />

                      <Range 
                        name="salesCycle" 
                        label="Ciclo de venda" 
                        labelStart="Curto"
                        labelEnd="Longo"
                        description="O ciclo de vendas se refere ao tempo que envolve a relação entre o cliente e empresa, cada etapa do ciclo de vendas representa as fazes que são necessárias para venda do serviço ou produto."
                      />

                      <Range 
                        name="churn" 
                        label="Churn" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />

                      <Range 
                        name="marketSize" 
                        label="Tamanho de mercado" 
                        labelStart="Pequeno (menor que R$200M)"
                        labelEnd="Grande (bilhões)"
                      />

                      <Range 
                        name="scalePotential" 
                        label="Potencial de escala" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />

                      <Range 
                        name="futureSale" 
                        label="Possibilidade de saída (venda futura)" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />

                      <Range 
                        name="pmf" 
                        label="Já atingiu PMF? (Product Market Fit)" 
                        labelStart="Longe"
                        labelEnd="Atingido"
                        description=""
                      />

                      <Range 
                        name="governance" 
                        label="Governança" 
                        labelStart="Fraca"
                        labelEnd="Boa"
                      />

                      <Range 
                        name="solveProblem" 
                        label="Resolve um problema?" 
                        labelStart="Pequeno"
                        labelEnd="Grande"
                      />

                      <Range 
                        name="competitiveDifferential" 
                        label="Diferencial competitivo" 
                        labelStart="Pequeno"
                        labelEnd="Grande"
                      />

                      <Range 
                        name="mentors" 
                        label="Tem mentores?" 
                        labelStart="Não"
                        labelEnd="Sim, experientes"
                      />

                      <Range 
                        name="fullTimeFounders" 
                        label="Fundadores fulltime na operação?" 
                        labelStart="Nenhum"
                        labelEnd="Todos"
                      />

                      <Buttons>
                        <a style={{ maxWidth: '100px' }} type="submit" onClick={handleBackStage} >Voltar</a>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Avançar <AiOutlineDoubleRight /></Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                  </>
                  )}

                  {stage === 4 && (
                  <>
                  <BodyTitle>
                    <h3>Fatores de risco</h3>
                  </BodyTitle>

                  <Form ref={formRef4} onSubmit={handleSubmit4}>
                    <FormDiv className="formSpaceRange">

                      <Range 
                        name="regulatoryRisk" 
                        label="Risco técnico ou regulatório?" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />
                    
                      <Range 
                        name="competition" 
                        label="Existe concorrência/competidores?" 
                        labelStart="Pouca"
                        labelEnd="Muita"
                      />
                    
                      <Range 
                        name="abilityDeliverPromises" 
                        label="Capacidade de entregar o que promete?" 
                        labelStart="Pouca"
                        labelEnd="Muita"
                      />
                    
                      <Range 
                        name="ownTechnology" 
                        label="Tecnologia própria?" 
                        labelStart="Não"
                        labelEnd="Totalmente"
                      />
                    
                      <Range 
                        name="riskConflictFounders" 
                        label="Risco de conflito entre fundadores?" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />
                    
                      <Range 
                        name="professionalManagement" 
                        label="Gestão profissional?" 
                        labelStart="Não profissional"
                        labelEnd="Profissional"
                      />
                    
                      <Range 
                        name="politicalRisk" 
                        label="Risco político?" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />
                    
                      <Range 
                        name="legalRisk" 
                        label="Risco jurídico?" 
                        labelStart="Baixo"
                        labelEnd="Alto"
                      />

                      <Buttons>
                        <a style={{ maxWidth: '100px' }} type="submit" onClick={handleBackStage}>Voltar</a>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Salvar </Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                  </>
                  )}

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let states = [] as IState[];
  await setupAPIClient(ctx).get('/countries/33/states').then(response => {
    const statesRes = response.data;
    states = statesRes;
  }).catch((err) => { console.log(err); });
  
  return {
    props: {
      states
    }
  }
}
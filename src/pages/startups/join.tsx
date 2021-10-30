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
import { MdAttachMoney, MdComputer } from 'react-icons/md';
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
import { format } from 'date-fns';

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
  logo: File;
  name: string;
  descriptionShort: string;
  description: string;
  site: string;
  state: string;
  city: string;
  fundationDate: string;
  phase: string;
  businessModel: string;
  segment: string;
  clientsNumber: number;
  partnersNumber: number;
  breakeven: string;
  searchInvestment: string;
  valueCapture: number;
  equityPercentage: number;
  timeBreakevenAfterInvestment: string;
  manyMonthsInvestmentLast: string;
  valuation: number;
  pitch: File;
}

export default function Join({states}: IJoinProps) {const formRef = useRef<FormHandles>(null);
  const formRef1 = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [statesSelect, setStatesSelect] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { addToast } = useToast();

  const [checkBoxAgreeTermsUse, setCheckBoxAgreeTermsUse] = useState('false');
  const [checkBoxAgreePrivacyPolicy, setCheckBoxAgreePrivacyPolicy] = useState('false');

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
      api.get('/countries/33/states').then(response => {
        const statesRes = response.data;
        statesRes?.map(state => {
          statesSelect.push({ label: state.name, value: state.id});
        });
      }).catch((err) => { console.log(err); });
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

  const handleSubmit1 = useCallback(
    async (data: IStartup) => {
      try {
        formRef1.current?.setErrors({});

        const requiredText = "Campo é obrigatório";

        const schema = Yup.object().shape({
          name: Yup.string().required(requiredText),
          descriptionShort: Yup.string().required("Campo curta é obrigatório"),
          description: Yup.string().required(requiredText),
          site: Yup.string(),
          state: Yup.string().required(requiredText),
          city: Yup.string().required(requiredText),
          fundationDate: Yup.date().required(),
          phase: Yup.string().required(requiredText),
          businessModel: Yup.string().required(requiredText),
          segment: Yup.string().required(requiredText),
          clientsNumber: Yup.number().required(requiredText),
          partnersNumber: Yup.number().required(requiredText),
          breakeven: Yup.number().required(requiredText),
          searchInvestment:  Yup.number().required(requiredText),
          valueCapture: Yup.number().required(requiredText),
          equityPercentage: Yup.number().required(requiredText),
          timeBreakevenAfterInvestment: Yup.number().required(requiredText),
          manyMonthsInvestmentLast: Yup.number().required(requiredText),
          valuation: Yup.number().required(requiredText),
          agreeTermsUse: Yup.string().oneOf(['true'], 'Confirme que você concorda com os Termos de Uso.'),
          agreePrivacyPolicy: Yup.string().oneOf(['true'], 'Confirme que você concorda com a Política de Privacidade.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = new FormData();
        formData.append('surname', data.name.trim());
        formData.append('name', data.name);
        formData.append('descriptionShort', data.descriptionShort);
        formData.append('description', data.description);
        formData.append('site', data.site);
        formData.append('countryId', '33');
        formData.append('stateId', data.state);
        formData.append('cityId', data.city);
        formData.append('fundationDate', format(new Date(data.fundationDate), 'yyyy-MM-dd'));
        formData.append('phase', data.phase);
        formData.append('businessModel', data.businessModel);
        formData.append('segment', data.segment);
        formData.append('clientsNumber', data.clientsNumber.toString());
        formData.append('partnersNumber', data.partnersNumber.toString());
        formData.append('breakeven', data.breakeven);
        formData.append('searchInvestment', data.searchInvestment);
        formData.append('valueCapture', data.valueCapture.toString());
        formData.append('equityPercentage', data.equityPercentage.toString());
        formData.append('timeBreakevenAfterInvestment', data.timeBreakevenAfterInvestment);
        formData.append('manyMonthsInvestmentLast', data.manyMonthsInvestmentLast);
        formData.append('valuation', data.valuation.toString());

        if (data.logo) {
          formData.append('logo', data.logo);
        }

        if (data.pitch) {
          formData.append('pitchdeck', data.pitch);
        }
        
        const response = await api.post(`/startups`, formData);
          
        if (response.status !== 200) {
          throw new Error("");          
        }

        addToast({
          type: "success",
          title: "Statup criada!",
          description:
            "Startup criada com sucesso.",
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

              {/* <TimeLineHeaderDiv>
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
              </TimeLineHeaderDiv> */}

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
                        name="logo"
                        accept="image/JPG, image/JPEG, image/PNG"
                        // title="Icone" 
                        type="image"
                        size="icon"
                      />
                      <Input name="name" icon={IoIosRocket} label="Nome" />
                      <Input 
                        name="descriptionShort" 
                        icon={BsCardText} 
                        label="Descrição curta" 
                        description="A descrição curta se refere a descrição que será mostrada no card na página de busca de Startup"
                      />
                      <TextArea  name="description" label="Descrição" />

                      <Input name="site" icon={MdComputer} label="Site" />
                        
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
                          { label: 'Ideia', value: '1' },
                          { label: 'Validação', value: '2' },
                          { label: 'Aceleração', value: '3' },
                          { label: 'Investimento Anjo', value: '4' },
                          { label: 'Pré-Seed', value: '5' },
                          { label: 'Seed', value: '6' },
                          { label: 'Série A', value: '7' },
                          { label: 'Nenhuma das anteriores', value: '8' },
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
                      
                      <Input 
                        type="number"
                        defaultValue="0"
                        name="valuation" 
                        icon={MdAttachMoney} 
                        label="Valuation" 
                      />

                      <UploadInput 
                        name="pitch"
                        accept="file/PDF"
                        title="Anexe seu pitch (.pdf)" 
                        type="file"
                        size="file"
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
                        <InputCheckBoxText>Eu concordo com a <a href="/content/privacy" target="_blank">Politica de Privacidade</a></InputCheckBoxText>
                      </InputCheckBox>

                      <Buttons>
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Salvar </Button>
                      </Buttons>
                    </FormDiv>
                  </Form>
                  </>
                  )}

                  {/* {stage === 2 && (
                  <>
                  <BodyTitle>
                    <h3>Informações financeiras</h3>
                  </BodyTitle>

                  <Form ref={formRef2} onSubmit={handleSubmit2}>
                    <FormDiv> */}
                      {/* <Input 
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
                      /> */}

                      {/* <Select 
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
                      /> */}

                      {/* <Input 
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
                      /> */}
                      
                      {/* <Select 
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
                        <Button style={{ maxWidth: '100px' }} loading={requestLoading} type="submit">Salvar </Button>
                      </Buttons> */}
                    {/* </FormDiv>
                  </Form>
                  </>
                  )} */}
                  {/* {stage === 3 && false && (
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
                  )} */}

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

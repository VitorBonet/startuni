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
} from '../../../styles/startups/join/styles';

import { PrivatePage } from '../../../components/PrivatePage';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../../components/Cards/StartupCard';
import { useToast } from '../../../contexts/ToastContext';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/apiClient';
import getValidationErrors from '../../../utils/getValidationErrors';
import { ButtonFacebook } from '../../../components/ButtonFacebook';
import { ButtonGoogle } from '../../../components/ButtonGoogle';
import Input from '../../../components/Forms/Input';
import UploadInput from '../../../components/Forms/UploadInput';
import { DatePicker } from '../../../components/Forms/DatePicker';
import InputCheckBox from '../../../components/Forms/InputCheckBox';
import { Button } from '../../../components/Button';
import Select from '../../../components/Forms/Select';
import { TextArea } from '../../../components/Forms/TextArea';
import { setupAPIClient } from '../../../services/api';
import { GetServerSideProps } from 'next';
import Range from '../../../components/Forms/Range';
import { format } from 'date-fns';
import { IStartupDTOS } from '../../../dtos/IStartupsDTOS';

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

interface IJoinIdProps {
  startup: IStartupDTOS;
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

export default function JoinId({ startup }: IJoinIdProps) {const formRef = useRef<FormHandles>(null);
  const formRef1 = useRef<FormHandles>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [statesSelect, setStatesSelect] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { addToast } = useToast();

  console.log(startup);

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
        
        const response = await api.put(`/startups/${startup.id}`, formData);
          
        if (response.status !== 200) {
          throw new Error("");          
        }

        addToast({
          type: "success",
          title: "Statup criada!",
          description:
            "Startup atualizada com sucesso.",
        });
      
        // changeStage(2);
        router.push('/startups');
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
                <Link href="/startups" replace>
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
                  {stage === 1 && (
                  <>
                  <BodyTitle>
                    <h3>Nova StartUp</h3>
                  </BodyTitle>

                  <Form ref={formRef1} onSubmit={handleSubmit1} initialData={startup}>
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
                        name="clientsNumber" 
                        icon={FiUsers} 
                        label="Número de clientes" 
                      />
                      
                      <Input 
                        type="number"
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
                        name="valueCapture" 
                        icon={MdAttachMoney} 
                        label="Qual o valor que pretende captar?" 
                      />

                      <Input 
                        type="number"
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
  const { id } = ctx.params;
  let startup = {} as IStartupDTOS;
  await setupAPIClient(ctx).get(`/startups/${id}`).then(response => {
    startup = response.data;
  }).catch((err) => { console.log(err); });
  
  return {
    props: {
      startup,
    }
  }
}

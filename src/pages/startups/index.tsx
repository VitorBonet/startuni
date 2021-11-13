import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosRocket } from 'react-icons/io';
import Link from 'next/link';

import { 
  Body, 
  Content,
  ContentTitleDiv,
  ContentTitle,
  OptionsDiv,
  Option,
  StartupCards,
  NotFoundStartupsDiv,
  FiltersDiv,
  FilterDiv,
  FilterTitle,
  FiltersIem,
  FilterIem,
} from '../../styles/startups/styles';
import { useToast } from '../../contexts/ToastContext';
import Input from '../../components/Forms/Input';
import { PrivatePage } from '../../components/PrivatePage';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../components/Cards/StartupCard';
import { Button } from '../../components/Button';
import { api } from '../../services/apiClient';
import { IStartupDTOS } from '../../dtos/IStartupsDTOS';

interface ISearchForm {
  search: string;
}

export default function Startups() {
  const { isLoading, loading } = useApplicationStartUni();
  const formRefSearch = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [menu, setMenu] = useState(1);
  const [startups, setStartups] = useState<IStartupDTOS[]>([]);

  const [phaseFilter, setPhaseFilter] = useState([]);
  const [businessModelFilter, setBusinessModelFilter] = useState([]);
  const [segmentFilter, setSegmentFilter] = useState([]);

  function handlePhaseFilter(id: number) {
    const findIndex = phaseFilter?.findIndex(phaseFilt => phaseFilt === id);
    if (findIndex === -1) {
      setPhaseFilter([...phaseFilter, id]);
    } else {
      setPhaseFilter(phaseFilter?.filter(item => item !== id));
    }
  }

  function handleBusinessModelFilter(id: number) {
    const findIndex = businessModelFilter?.findIndex(item => item === id);
    if (findIndex === -1) {
      setBusinessModelFilter([...businessModelFilter, id]);
    } else {
      setBusinessModelFilter(businessModelFilter?.filter(item => item !== id));
    }
  }

  function handleSegmentFilter(id: number) {
    const findIndex = segmentFilter?.findIndex(item => item === id);
    if (findIndex === -1) {
      setSegmentFilter([...segmentFilter, id]);
    } else {
      setSegmentFilter(segmentFilter?.filter(item => item !== id));
    }
  }  

  const phase = [
    { label: 'Ideia', value: 1 },
    { label: 'Validação', value: 2 },
    { label: 'Aceleração', value: 3 },
    { label: 'Investimento Anjo', value: 4 },
    { label: 'Pré-Seed', value: 5 },
    { label: 'Seed', value: 6 },
    { label: 'Série A', value: 7 },
  ];

  const businessModel = [
    { label: 'Assinatura', value: 1 },
    { label: 'Ecommerce', value: 2 },
    { label: 'Venda de Serviço', value: 3 },
    { label: 'Venda de Produto', value: 4 },
    { label: 'Marketplace', value: 5 },
    { label: 'Consultoria', value: 6 },
    { label: 'Intermediação', value: 7 },
    { label: 'Outros', value: 8 },
  ];

  const segment = [
    {label:'Edtech', value: 1},
    {label:'Martech', value: 2},
    {label:'Fintech', value: 3},
    {label:'Insurtech', value: 4},
    {label:'Healthtech', value: 5},
    {label:'Retailtech', value: 6},
    {label:'Foodtech', value: 7},
    {label:'Construtech', value: 8},
    {label:'Sportech', value: 9},
    {label:'Imobitech', value: 10},
    {label:'Mobtech', value: 11},
    {label:'Govtech', value: 12},
    {label:'Autotech', value: 13},
    {label:'Energytech', value: 14},
    {label:'Agrotech', value: 15},
    {label:'Entretenimento', value: 16},
    {label:'Big Data e Analytics', value: 17},
    {label:'Hrtechs', value: 18},
    {label:'Telecom', value: 19},
    {label:'Outros', value: 20},
  ];

  // const startupsAux1 = [
  //   { 
  //     image: '/images/nubank.png', 
  //     name: 'NuBank', 
  //     foundedAt: new Date(),
  //     category: 'BANCO DIGITAL', 
  //     description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
  //     valuation: '1.6 MM', 
  //   },
  //   { 
  //     image: '/images/spacex.png', 
  //     name: 'SpaceX', 
  //     foundedAt: new Date(),
  //     category: 'FABRICANTE DE FOGUETE', 
  //     description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
  //     valuation: '2 BI' 
  //   },
  // ];

  // const startupsAux2 = [
  //   { 
  //     imageUrl: '/images/nubank.png', 
  //     name: 'NuBank', 
  //     createdAt: new Date(),
  //     category: 1, 
  //     description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
  //     valuation: '1.6 MM', 
  //   },
  //   { 
  //     imageUrl: '/images/spacex.png', 
  //     name: 'SpaceX', 
  //     createdAt: new Date(),
  //     category: 1, 
  //     description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
  //     valuation: '2 BI' 
  //   },
  //   { 
  //     imageUrl: '/images/nubank.png', 
  //     name: 'NuBank', 
  //     createdAt: new Date(),
  //     category: 1, 
  //     description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
  //     valuation: '1.6 MM', 
  //   },
  //   { 
  //     imageUrl: '/images/spacex.png', 
  //     name: 'SpaceX', 
  //     createdAt: new Date(),
  //     category: 1, 
  //     description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
  //     valuation: '2 BI' 
  //   },
  // ] as IStartup [];

  useEffect(() => {
    selectStartups();
  }, [phaseFilter, businessModelFilter, segmentFilter]);

  function selectStartups() {
    switch (menu) {
      case 2:
        // setStartups(startupsAux2);
        break;
      case 3:
        break;
    
      default:
        getStartupsOrbit();
        break;
    }
    
  }

  function handleSelectMenu(menu: number) {
    setMenu(menu);
    selectStartups();
  }

  const handleSubmitSearch = useCallback(
    async (data: ISearchForm) => {
        setStartups(startups.filter(start => start.name.indexOf(data.search) >= 0));
    },
    []
  );

  function search(term: string) {
    if (term) {
      const startupsFilter = startups.filter(start => start.name.indexOf(term) >= 0)
      setStartups(startupsFilter);
    }
  }

  function getStartupsFavorites(){
    // const request = await api.get(`/startups`, {
    //   params: {
    //     filter: 
    //   }
    // })
  }

  // function getStartupsHighlights(){
  //   setStartups();
  // }

  // function getStartupsReleases(){
  //   setStartups();
  // }

  async function getStartupsOrbit(){
    const request = await api.get(`/startups`, {
      params: {
        take: 200,
        page: 1,
        phase: phaseFilter,
        businessModel: businessModelFilter,
        segment: segmentFilter,
      }
    })

    if (request.data.count > 0) {
      setStartups(request.data.data);
    } else {
      setStartups([]);
    }
  }

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();
      }, 1000);
    }

  }, []);

  return (
    <>
      <PrivatePage title="Startups | StartUni">
        <Body>
          <Content>
            <ContentTitleDiv>
              <h2>StartUps</h2>
              <ContentTitle>
                <Form ref={formRefSearch} onSubmit={handleSubmitSearch}>
                  <Input 
                    type="text"
                    name="search" 
                    icon={AiOutlineSearch}
                    placeholder="Buscar Startup..."
                    onChange={(e) => search(e.currentTarget.value)}
                  />
                </Form>
                <Link href="/startups/join"><Button style={{ marginTop: '7px' }} ><IoIosRocket />Nova Startup</Button></Link>
              </ContentTitle>
            </ContentTitleDiv>
            <OptionsDiv>
              <Option className={menu === 1 && 'active'} onClick={() => handleSelectMenu(1)}>
                <a>Favoritos</a>
                <div></div>
              </Option>
              <Option className={menu === 2 && 'active'} onClick={() => handleSelectMenu(2)}>
                <a>Destaques</a>
                <div></div>
              </Option>
              <Option className={menu === 3 && 'active'} onClick={() => handleSelectMenu(3)}>
                <a>Lançamentos</a>
                <div></div>
              </Option>
              <Option className={menu === 4 && 'active'} onClick={() => handleSelectMenu(4)}>
                <a>Em órbita</a>
                <div></div>
              </Option>
            </OptionsDiv>

            {menu === 4 && (
              <FiltersDiv>
                <FilterDiv>
                  <FilterTitle>Estágio atual</FilterTitle>
                  <FiltersIem> 
                    {phase.map(phas => (<FilterIem className={phaseFilter.findIndex(item => item === phas.value) >= 0 ? 'selected': ''} onClick={() => handlePhaseFilter(phas.value)}>{phas.label}</FilterIem>))}
                  </FiltersIem>
                </FilterDiv>

                <FilterDiv>
                  <FilterTitle>Modelo de Negócio</FilterTitle>
                  <FiltersIem> 
                    {businessModel.map(businessMod => (<FilterIem className={businessModelFilter.findIndex(item => item === businessMod.value) >= 0 ? 'selected': ''} onClick={() => handleBusinessModelFilter(businessMod.value)}>{businessMod.label}</FilterIem>))}
                  </FiltersIem>
                </FilterDiv>

                <FilterDiv>
                  <FilterTitle>Segmento do negócio</FilterTitle>
                  <FiltersIem> 
                    {segment.map(segm => (<FilterIem className={segmentFilter.findIndex(item => item === segm.value) >= 0 ? 'selected': ''} onClick={() => handleSegmentFilter(segm.value)}>{segm.label}</FilterIem>))}
                  </FiltersIem>
                </FilterDiv>
              </FiltersDiv>
            )}

            <StartupCards>
              { startups?.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              )) }

              { startups.length === 0 && (
                <NotFoundStartupsDiv>
                  <img src="/images/countingStars.svg" alt="countingStars" />
                  <h3>Nenhuma Startup avistada nos radares!</h3>
                </NotFoundStartupsDiv>
              ) }
            </StartupCards>
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}
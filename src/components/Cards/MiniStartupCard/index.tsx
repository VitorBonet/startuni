import React from 'react';
import { format } from 'date-fns';
import { MdAttachMoney } from 'react-icons/md';
import { BiTime, BiMap } from 'react-icons/bi';
import Link from 'next/link';

import { 
  Container, 
  TitleDiv,
  Icon,
  Title,
  Descriptiion,
  Valuation,
  TextInfo,
} from './styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IStartupDTOS } from '../../../dtos/IStartupsDTOS';

interface IStartupCardProps {
  startup: IStartupDTOS
  type?: 's' | 'm'
}

export function MiniStartupCard({ startup, type = 's' }: IStartupCardProps) {
  const router = useRouter();

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
  
  const segmentDescription = segment.find(seg => seg.value === startup.segment);

  return (
    <Link href={ type === 'm' ? `/startups/${startup.id}` : `/startups/dashboards/${startup.id}`} replace>
    <Container>
      <TitleDiv>
        <Icon>
          <img src={startup.logoUrl} alt={startup.name} />
        </Icon>
        <Title>
          <h3>{startup.name}</h3>
          <h6>{segmentDescription.label}</h6>
        </Title>
      </TitleDiv>

      {/* <TextInfo><BiTime size={12}/><h6>{format(new Date(startup.fundationDate), 'dd/MM/yyyy')}</h6></TextInfo>
      {startup?.country && (<TextInfo><BiMap size={12}/><h6>{startup.city.name} - {startup.state.code}, {startup.country.name}</h6></TextInfo>)} */}

      {/* <Valuation><MdAttachMoney /><h4>{startup.valuation.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h4></Valuation> */}
      
    </Container>
    </Link>
  );
}

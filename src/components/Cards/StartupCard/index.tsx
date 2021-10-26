import React from 'react';
import { format } from 'date-fns';
import { MdAttachMoney } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';

import { 
  Container, 
  Icon,
  Title,
  Descriptiion,
  Valuation,
  TextInfo,
} from './styles';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface IStartup {
  id: string;
  surname: string;
  name: string;
  descriptionShort: string;
  description: string;
  logo: string;
  logoUrl: string;
  site: string;
  country: number;
  state: number;
  city: number;
  phase: number;
  businessModel: number;
  segment: number;
  clientsNumber: number;
  partnersNumber: number;
  pitchdeck?: string;
  pitchdeckUrl?: string;
  breakeven: number;
  searchInvestment: number;
  valueCapture: number;
  equityPercentage: number;
  timeBreakevenAfterInvestment: number;
  manyMonthsInvestmentLast: number;
  valuation: number;
  status: string;
  createdAt: Date;
}

interface IStartupCardProps {
  startup: IStartup
}

export function StartupCard({ startup }: IStartupCardProps) {
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
    <Container>
      <Icon>
        <img src={startup.logoUrl} alt={startup.name} />
      </Icon>
      <Title>
        <h3>{startup.name}</h3>
        <h6>{segmentDescription.label}</h6>
      </Title>

      {/* <TextInfo><BiTime size={12}/><h6>{format(startup.createdAt, 'dd/MM/yyyy')}</h6></TextInfo> */}
      <Descriptiion>{startup.description}</Descriptiion>

      <Valuation><MdAttachMoney /><h4>{startup.valuation.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h4></Valuation>
      
    </Container>
  );
}

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

interface IStartupCardProps {
  startup: {
    image: string;
    name: string;
    foundedAt: Date;
    category: string;
    description: string;
    valuation: string;
  }
}

export function StartupCard({ startup }: IStartupCardProps) {
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

  return (
    <Container>
      <Icon>
        <img src={startup.image} alt={startup.name} />
      </Icon>
      <Title>
        <h3>{startup.name}</h3>
        <h6>{startup.category}</h6>
      </Title>

      <TextInfo><BiTime size={12}/><h6>{format(startup.foundedAt, 'dd/MM/yyyy')}</h6></TextInfo>
      <Descriptiion>{startup.description}</Descriptiion>

      <Valuation><MdAttachMoney /><h4>{startup.valuation}</h4></Valuation>
      
    </Container>
  );
}

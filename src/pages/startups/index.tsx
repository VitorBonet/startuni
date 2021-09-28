import React, { useEffect, useState } from 'react';

import { 
  Body, 
  Content,
  OptionsDiv,
  Option,
  StartupCards,
  NotFoundStartupsDiv,
} from '../../styles/startups/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../components/Cards/StartupCard';

export default function Startups() {
  const { isLoading, loading } = useApplicationStartUni();
  const [menu, setMenu] = useState(1);
  const [startups, setStartups] = useState([]);

  const startupsAux1 = [
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
  ];

  const startupsAux2 = [
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
  ];

  const startupsAux3 = [
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
    { 
      image: '/images/nubank.png', 
      name: 'NuBank', 
      foundedAt: new Date(),
      category: 'BANCO DIGITAL', 
      description: 'Pioneira no segmento de serviços financeiros, atuando como operadora de cartões de crédito e fintech.', 
      valuation: '1.6 MM', 
    },
    { 
      image: '/images/spacex.png', 
      name: 'SpaceX', 
      foundedAt: new Date(),
      category: 'FABRICANTE DE FOGUETE', 
      description: 'fabricante estadunidense de sistemas aeroespaciais, transporte espacial e comunicações.', 
      valuation: '2 BI' 
    },
  ];

  function selectStartups(menu: number) {
    switch (menu) {
      case 2:
        setStartups(startupsAux2);
        break;
      case 3:
        setStartups(startupsAux3);
        break;
    
      default:
        setStartups(startupsAux1);
        break;
    }
    
  }

  function handleSelectMenu(menu: number) {
    setMenu(menu);
    selectStartups(menu);
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
      <PrivatePage title="">
        <Body>
          <Content>
            <h2>StartUps</h2>
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
            <StartupCards>
              { startups?.map(startup => (
                <StartupCard startup={startup} />
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
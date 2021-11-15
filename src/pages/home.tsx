import React, { useEffect, useState } from 'react';

import { 
  Body, 
  Content,
  Container,
  Title,
  Items,
  ItemMessageNotDiv,
  ItemMessageNot,
} from '../styles/home/styles';
import { PrivatePage } from '../components/PrivatePage';
import { LeftColumn } from '../components/LeftColumn';
import { MiddleColumn } from '../components/MiddleColumn';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FeedShare } from '../components/MiddleColumn/FeedShare';
import { RightColumn } from '../components/RightColumn';
import { useApplicationStartUni } from '../contexts/ApplicationStartUniContext';
import { IStartupDTOS } from '../dtos/IStartupsDTOS';
import { api } from '../services/apiClient';
import { MiniStartupCard } from '../components/Cards/MiniStartupCard';
import { useAuth } from '../contexts/AuthContext';
import { IMatchsDTOS } from '../dtos/IMatchsDTOS';

interface IProfileData {
  startups: number;
  investiments: number;
  matchs: number;
}

export default function Home() {
  const { isLoading, loading } = useApplicationStartUni();
  const [startups, setStartups] = useState<IStartupDTOS[]>([]);
  const [startupMatchs, setStartupMatchs] = useState<IStartupDTOS[]>([]);
  const [profileData, setProfileData] = useState<IProfileData>();
  const { user } = useAuth();

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    getMyStartups();
    getStartupsMatchs();
  }, [user])

  useEffect(() => {
    setProfileData(
      { 
        startups: startups.length,  
        investiments: 0,
        matchs: startupMatchs.length,
      }
    )
  }, [startups, startupMatchs])

  async function getMyStartups() {
    try {
      api.get(`/startups/my`).then(response => {
        setStartups(response.data);
      });
    } catch (error) {}
  }

  async function getStartupsMatchs(){
    console.log(user);
    const request = await api.get<IMatchsDTOS[]>(`/matchs/${user?.id}/i`, {
      params: {
        take: 200,
        page: 1,
      }
    })

    const startupsFind = [];
    const promiseMatchs = request.data.map(match => {
      startupsFind.push(match.startup);
    })
    
    await Promise.all(promiseMatchs);
    setStartupMatchs(startupsFind);
  }

return (
  <PrivatePage title="Home | StartUni">
    <Body>
      <Content>
        <LeftColumn infos={profileData}/>
        <MiddleColumn>
          <div>
            <Container>
              <Title>Minhas Startups</Title>
              <Items>  
                { startups?.map(startup => (
                  <MiniStartupCard key={startup.id} startup={startup} />
                )) }

                {startups.length === 0 && (
                  <ItemMessageNotDiv>
                  <ItemMessageNot>Você ainda não possui nenhuma startup.</ItemMessageNot>
                  <ItemMessageNot>Ainda da tempo de criar a sua...</ItemMessageNot>
                  </ItemMessageNotDiv>
                )}
              </Items>
            </Container>

            <Container>
              <Title>Meus Investimentos</Title>
              <Items>      
                {/* { startups?.map(startup => (
                    <MiniStartupCard key={startup.id} startup={startup} />
                  )) } */}

                {true && (
                  <ItemMessageNotDiv>
                  <ItemMessageNot>Você ainda não possui nenhum investimento.</ItemMessageNot>
                  <ItemMessageNot>As melhores oportunidades você encontra aqui, invista e pense no futuro.</ItemMessageNot>
                  </ItemMessageNotDiv>
                )}
              </Items>
            </Container>
            
            <Container>
              <Title>Meus Matchs</Title>
              <Items>      
                { startupMatchs?.map(startup => (
                    <MiniStartupCard key={startup.id} startup={startup} type="m"/>
                  )) }

                {startupMatchs.length === 0 && (
                  <ItemMessageNotDiv>
                    <ItemMessageNot>Você ainda não possui nenhum match.</ItemMessageNot>
                    <ItemMessageNot>Solicite um match para ter informações mais detalhadas sobre as startups</ItemMessageNot>
                  </ItemMessageNotDiv>
                )}
              </Items>
            </Container>
            <LoadingSpinner visible={isLoading} />
          </div>
        </MiddleColumn>
      </Content>
    </Body>
  </PrivatePage>
  );
}
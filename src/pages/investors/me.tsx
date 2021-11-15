import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { 
  Body, 
  Content,
  Container,
  Title,
  Data,
  DataTitle,
  DataText,
  Items,
  ItemMessageNotDiv,
  ItemMessageNot,
} from '../../styles/investors/me/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { LeftColumn } from '../../components/LeftColumn';
import { MiddleColumn } from '../../components/MiddleColumn';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { FeedShare } from '../../components/MiddleColumn/FeedShare';
import { RightColumn } from '../../components/RightColumn';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { api } from '../../services/apiClient';
import { MiniStartupCard } from '../../components/Cards/MiniStartupCard';
import { useAuth } from '../../contexts/AuthContext';
import { IMatchsDTOS } from '../../dtos/IMatchsDTOS';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '../../services/api';
import { IInvestorsDTOS } from '../../dtos/IInvestorsDTOS';
import { IStartupDTOS } from '../../dtos/IStartupsDTOS';
import { Button } from '../../components/Button';

interface IProfileData {
  startups: number;
  investiments: number;
  matchs: number;
}

interface IMeProps {
  investor: IInvestorsDTOS;
}

export default function Me({ investor }: IMeProps) {
  const { isLoading, loading } = useApplicationStartUni();
  const { user } = useAuth();
  const router = useRouter();

  const [startups, setStartups] = useState<IStartupDTOS[]>([]);
  const [startupMatchs, setStartupMatchs] = useState<IStartupDTOS[]>([]);
  const [profileData, setProfileData] = useState<IProfileData>();

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

  const maritalStatus = [ 
    { label: 'Solteiro(a)', value: '1' },
    { label: 'Casado(a)', value: '2' },
    { label: 'Divorciado(a)', value: '3' },
    { label: 'Viúvo(a)', value: '4' },
  ];

  const genre = [ 
    { label: 'Masculino', value: '1' },
    { label: 'Feminino', value: '2' },
  ];

  const office = [ 
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
  ];

  function toggleEdit() {
    router.push(`/investors/join/edit`);
  }
  
  return (
  <PrivatePage title="Home | StartUni">
    <Body>
      <Content>
        <LeftColumn investor={investor} infos={profileData}/>
        <MiddleColumn>
          <div>
            <Container>
              <Title>Meus Dados</Title>
              <Items className="column">     
                  <Data>
                    <DataTitle>Nome: </DataTitle>
                    <DataText>{investor.user?.name}</DataText>
                  </Data>   
                  <Data>
                    <DataTitle>Email: </DataTitle>
                    <DataText>{investor.user?.email}</DataText>
                  </Data>
                  <Data>
                    <DataTitle>CPF: </DataTitle>
                    <DataText>...</DataText>
                  </Data>  
                  <Data>
                    <DataTitle>RG: </DataTitle>
                    <DataText>...</DataText>
                  </Data>  
                  <Data>
                    <DataTitle>Estado Civil: </DataTitle>
                    <DataText>{maritalStatus.find(matStat => Number(matStat.value) === investor.maritalStatus)?.label}</DataText>
                  </Data>  
                  <Data>
                    <DataTitle>Gênero: </DataTitle>
                    <DataText>{genre.find(genr => Number(genr.value) === investor.genre)?.label}</DataText>
                  </Data>  
                  <Data>
                    <DataTitle>País: </DataTitle>
                    <DataText>{investor.country?.name}</DataText>
                  </Data>
                  <Data>
                    <Data>
                      <DataTitle>DDI: </DataTitle>
                      <DataText>{investor.DDI}</DataText>
                    </Data>

                    <Data>
                      <DataTitle>Telefone: </DataTitle>
                      <DataText>{investor.phone}</DataText>
                    </Data>
                  </Data>
              </Items>
            </Container>

            <Container>
              <Title>Sobre</Title>
              <Items>    
                <ItemMessageNotDiv>
                  <ItemMessageNot>{investor.description}</ItemMessageNot>
                </ItemMessageNotDiv>
              </Items>
            </Container>

            <Container>
              <Title>Investimentos</Title>
              <Items>      
                {/* { startups?.map(startup => (
                    <MiniStartupCard key={startup.id} startup={startup} />
                  )) } */}

                {true && (
                  <ItemMessageNotDiv>
                  <ItemMessageNot>Ainda não possui nenhum investimento.</ItemMessageNot>
                  </ItemMessageNotDiv>
                )}
              </Items>
            </Container>
            
            <LoadingSpinner visible={isLoading} />
          </div>
        </MiddleColumn>
        
        <Button style={{ width: '64px' }} onClick={toggleEdit}>Editar</Button>
      </Content>
    </Body>
  </PrivatePage>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let investor = {} as IInvestorsDTOS;
  await setupAPIClient(ctx).get(`/investors/me`).then(response => {
    investor = response.data;
  }).catch((err) => { console.log(err); });
  
  return {
    props: {
      investor,
    }
  }
}
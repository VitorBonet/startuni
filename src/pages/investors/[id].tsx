import React, { useEffect, useState } from 'react';

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
  ButtonsAcceptance,
} from '../../styles/investors/show/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { LeftColumn } from '../../components/LeftColumn';
import { MiddleColumn } from '../../components/MiddleColumn';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { FeedShare } from '../../components/MiddleColumn/FeedShare';
import { RightColumn } from '../../components/RightColumn';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { IStartupDTOS } from '../../dtos/IStartupsDTOS';
import { api } from '../../services/apiClient';
import { MiniStartupCard } from '../../components/Cards/MiniStartupCard';
import { useAuth } from '../../contexts/AuthContext';
import { IMatchsDTOS } from '../../dtos/IMatchsDTOS';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '../../services/api';
import { IInvestorsDTOS } from '../../dtos/IInvestorsDTOS';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';
import { useToast } from '../../contexts/ToastContext';

interface IProfileData {
  startups: number;
  investiments: number;
  matchs: number;
}

interface IInvestorShowProps {
  investor: IInvestorsDTOS;
}

export default function InvestorShow({ investor }:IInvestorShowProps ) {
  const { isLoading, loading } = useApplicationStartUni();
  const [startups, setStartups] = useState<IStartupDTOS[]>([]);
  const [startupMatchs, setStartupMatchs] = useState<IStartupDTOS[]>([]);
  const [profileData, setProfileData] = useState<IProfileData>();
  const { user } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const matchId = router.query.code as string;

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
      api.get(`/startups/users/${investor.id}`).then(response => {
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

  async function toggleAcceptance(matchId: string, acceptance: boolean) {
    if (!acceptance) {
      const conf = confirm("Tem certeza que deseja recusar esse investidor?");
      if (!conf) {
        return;
      }
    }

    try {
      api.post(`/matchs/${matchId}/acceptance`, {
          acceptance,
      }).then(response => {
        addToast({
          type: "success",
          title: "Sucesso!",
          description: "Ação executada com sucesso",
        });
      });

      router.push(`/startups/dashboards/${router.query.ret}`);
      
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro",
        description: "Ocorreu um erro, por favor tente de novo.",
      });
    }
  }

return (
  <PrivatePage title="Home | StartUni">
    <Body>
      <Content>
        <LeftColumn infos={profileData} investor={investor}/>
        <MiddleColumn>
          <div>
            <Container>
              
            <Title>Dados</Title>
              <Items className="column">     
                  <Data>
                    <DataTitle>Nome: </DataTitle>
                    <DataText>{investor.user?.name}</DataText>
                  </Data>   

                  { investor.cpf && (
                    <>
                    <Data>
                      <DataTitle>Email: </DataTitle>
                      <DataText>{investor.user?.email}</DataText>
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
                    </>
                  ) }
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

        { router.query.act === 'acceptance' && (
          <ButtonsAcceptance>
            <Button className="refused" style={{ marginTop: 0 }} onClick={() => toggleAcceptance(matchId, false)} >Recusar</Button>
            <Button className="revert" style={{ marginTop: 0 }} onClick={() => toggleAcceptance(matchId, true)} >Aceitar</Button>
          </ButtonsAcceptance>
        ) }
      </Content>
    </Body>
  </PrivatePage>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  let investor = {} as IInvestorsDTOS;
  await setupAPIClient(ctx).get(`/investors/${id}`).then(response => {
    investor = response.data;
  }).catch((err) => { console.log(err); });
  
  return {
    props: {
      investor,
    }
  }
}
import React, { useEffect, useState } from 'react';
import { 
  AiOutlineUser, 
  AiFillLinkedin, 
  AiOutlineTwitter,
  AiOutlineInstagram, 
  AiOutlineNodeIndex, 
  AiOutlinePlus, 
  AiOutlineUp 
} from 'react-icons/ai';
import { FaLessThanEqual, FaUserAstronaut, FaUserTie } from 'react-icons/fa';
import { BiCodeAlt, BiMap, BiTime } from 'react-icons/bi';
import Link from 'next/link';
import Router from 'next/router';

import { 
  Body, 
  Content,
  Container,
  ContainerPrimary,
  ContainerPrimaryLeft,
  ContainerPrimaryRight,
  BackgroundImage,
  Logo,
  StartupInfoDiv,
  StartupInfo,
  StartupInfoLine,
  MenuOptionsDiv,
  MenuOption,
  Table,
  TableItem,
  TableItemUser,
  TableItemImage,
  AvatarIcon,
  TableItemText,
  TableItemButtons,
} from '../../../styles/startups/dashboards/show/styles';
import { PrivatePage } from '../../../components/PrivatePage';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';
import { IStartupDTOS } from '../../../dtos/IStartupsDTOS';
import { setupAPIClient } from '../../../services/api';
import { GetServerSideProps } from 'next';
import { Button } from '../../../components/Button';
import { api } from '../../../services/apiClient';
import { IMatchsDTOS } from '../../../dtos/IMatchsDTOS';
import { useToast } from '../../../contexts/ToastContext';

interface IStratupProps {
  startup: IStartupDTOS;
}

export default function StartupsDashboards({ startup }: IStratupProps) {
  const { isLoading, loading } = useApplicationStartUni();
  const [menu, setMenu] = useState(1);
  const [matchs, setMatchs] = useState<IMatchsDTOS[]>([]);
  const { addToast } = useToast();

  let page = 1;
  async function getMatchs() {
    console.log(startup.id);
    try {
      api.get(`/matchs/${startup.id}/acceptance`, {
        params: {
          take: 15,
          page,
        }
      }).then(response => {
        setMatchs(response.data);
      });
    } catch (error) {
      
    }
  }

  async function toggleAcceptance(matchId: string, acceptance: boolean) {
    try {
      api.post(`/matchs/${matchId}/acceptance`, {
          acceptance,
      }).then(response => {
        addToast({
          type: "success",
          title: "Sucesso!",
          description: "Ação executada com sucesso",
        });

        setMatchs(matchs.filter(match => match.id !== matchId));
      });
      
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro",
        description: "Ocorreu um erro, por favor tente de novo.",
      });
    }
  }

  useEffect(() => {
    getMatchs();

  }, []);

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();
      }, 1000);
    }

  }, []);

  function handleSelectMenu(menu: number) {
    setMenu(menu);
  }

  const formatCurrencyBRL = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

  return (
    <>
      <PrivatePage title="">
        <Body>
          <Content>
            <ContainerPrimary>
              <ContainerPrimaryLeft>
                <Container className="primary">
                  <BackgroundImage imageUrl="/images/backgroundStartup.jpg" >
                    <Logo>
                      <img src={startup.logoUrl} alt={startup.name} />
                    </Logo>
                  </BackgroundImage>
                  <StartupInfoDiv>
                    <StartupInfo>
                      <h1>{startup.name}</h1>                
                      <StartupInfoLine>
                        <p>{startup.descriptionShort}</p>
                      </StartupInfoLine>
                      <br />               
                    </StartupInfo>
                  </StartupInfoDiv>
                </Container>
              </ContainerPrimaryLeft>

              <ContainerPrimaryRight>
                {/* <RoundInvestmentCard /> */}
              </ContainerPrimaryRight>
            </ContainerPrimary>

            <Container>
              <MenuOptionsDiv>
                <MenuOption className={menu === 1 && 'active'} onClick={() => handleSelectMenu(1)}>
                  <a>Matchs Pendentes ({matchs.length})</a>
                  <div></div>
                </MenuOption>
                <MenuOption className={menu === 2 && 'active'} onClick={() => handleSelectMenu(2)}>
                  <a>Destaques</a>
                  <div></div>
                </MenuOption>
              </MenuOptionsDiv>
            </Container>

            { menu === 1 && (
              <Container>
                <Table>
                  {matchs.map(match => (
                    <TableItem>
                      <Link href={`/investors/${match.investor.id}?act=acceptance&code=${match.id}&ret=${match.startupId}`} >
                        <TableItemUser>
                          <TableItemImage>
                          { match.investor?.avatarUrl ? (
                              <img
                                src={`${match.investor.avatarUrl}`}
                                alt={`${match.investor.name}`}
                                className="profile-picture"
                              />
                            ) : (
                              <AvatarIcon>
                                <AiOutlineUser size={20} />
                              </AvatarIcon>
                          ) }
                          </TableItemImage>
                          <TableItemText>
                            <h3>{match.investor.name}</h3>
                            <p>Aspirante</p>
                          </TableItemText>
                        </TableItemUser>
                      </Link>
                      <TableItemButtons>
                        <Button className="refused" style={{ marginTop: 0 }} onClick={() => toggleAcceptance(match.id, false)} >Recusar</Button>
                        <Button className="revert" style={{ marginTop: 0 }} onClick={() => toggleAcceptance(match.id, true)} >Aceitar</Button>
                      </TableItemButtons>
                    </TableItem>
                  ))}
                </Table>
              </Container>
            ) }
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
  }).catch((err) => {   });

  if (!startup.id) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      }
    }
  }

  return {
    props: {
      startup,
    }
  }
}
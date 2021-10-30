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
import { FaUserAstronaut, FaUserTie } from 'react-icons/fa';
import { BiCodeAlt, BiMap, BiTime } from 'react-icons/bi';
import Link from 'next/link';

import { 
  Body, 
  Content,
  Container,
  ContainerRight,
  ContainerPrimary,
  ContainerPrimaryLeft,
  ContainerPrimaryRight,
  BackgroundImage,
  Logo,
  StartupInfoDiv,
  StartupInfo,
  StartupInfoLine,
  StartupInfoMoney,
  StartupInfoMoneyValuation,
  StartupInfoMoneyValuationAlter,
  StartupInfoButtons,
  ContainerRightTitle,
  ContainerRightContent,
  InvestmentInfos,
  InvestmentInfo,
  ContainerHeader,
  ContainerHeaderCenter,
  ContainerNeedMatch,
  ContainerNeedMatchIcon,
  ContainerNeedMatchText,
  ThisIsDiv,
  ThisIsItem,
  ContainerContent,
  DashNumberDiv,
  Separator,
  Leaderships,
  Leadership,
  LeadershipImage,
  LeadershipImageFunctionIcon,
  LeadershipImageIcon,
  LeadershipText,
  LeadershipTextSocialIcons,
} from '../../styles/startups/show/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../components/Cards/StartupCard';
import { IStartupDTOS } from '../../dtos/IStartupsDTOS';
import { setupAPIClient } from '../../services/api';
import { GetServerSideProps } from 'next';
import { format } from 'date-fns';
import { BsBarChart } from 'react-icons/bs';
import { MdAttachMoney, MdComputer } from 'react-icons/md';
import Panel from '../../components/Panel';
import CatchmentRange from '../../components/PageInternal/Startups/Page/CatchmentRange';
import { Button } from '../../components/Button';
import { IoIosRocket } from 'react-icons/io';
import { FiAlertTriangle } from 'react-icons/fi';

interface IStratupProps {
  startup: IStartupDTOS;
}

export default function Startups({ startup }: IStratupProps) {
  const { isLoading, loading } = useApplicationStartUni();
  const leaders = [
    { name: 'Vitor Bonet', position: 'Fundador e CTO', imageUrl: '/images/vitorbonet.jpg', instagram: '/', linkedin: '/', twitter: '/'},
    { name: 'Diego Alves', position: 'Fundador e CEO', imageUrl: '/images/diegoAlves.jpg', instagram: '/', linkedin: '/', twitter: '/'},
  ];

  const team = [
    { name: 'Yuri Gagarin', position: 'Analista de dados', imageUrl: undefined, instagram: undefined, linkedin: '/', twitter: '/' },
    { name: 'Alan Shepard', position: 'Advogado', imageUrl: undefined, instagram: '/', linkedin: '/', twitter: '/' },
    { name: 'Eugene Cernan', position: 'Advogado', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'John Glenn', position: 'Analista de sistemas jr', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'James Lovell', position: 'Analista de sistemas pleno', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'Tom Stafford', position: 'Analista de sistemas pleno', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'Michael Collins', position: 'Analista de sistemas pleno', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'Richard Gordon', position: 'Analista de sistemas senior', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'Edwin Aldrin', position: 'Analista de sistemas senior', imageUrl: undefined, instagram: '/', linkedin: undefined, twitter: '/' },
    { name: 'Neil Armstrong', position: 'Analista de inovação', imageUrl: undefined, instagram: '/', linkedin: '/', twitter: '/' },
    { name: 'Elizabeth Mary', position: 'Marketing', imageUrl: undefined, instagram: '/', linkedin: '/', twitter: undefined },
  ]

  const phase = [ 
    { label: 'Ideia', value: '1' },
    { label: 'Validação', value: '2' },
    { label: 'Aceleração', value: '3' },
    { label: 'Investimento Anjo', value: '4' },
    { label: 'Pré-Seed', value: '5' },
    { label: 'Seed', value: '6' },
    { label: 'Série A', value: '7' },
    { label: 'Nenhuma das anteriores', value: '8' },
  ];

  const businessModel = [ 
    { label: 'Assinatura', value: '1' },
    { label: 'Ecommerce', value: '2' },
    { label: 'Venda de Serviço', value: '3' },
    { label: 'Venda de Produto', value: '4' },
    { label: 'Marketplace', value: '5' },
    { label: 'Consultoria', value: '6' },
    { label: 'Intermediação', value: '7' },
    { label: 'Outros', value: '8' },
  ];

  const segment = [ 
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
  ];

  const breakeven = [ 
    {label:'Sim, já foi atingido', value:'1'},
    {label:'Atingiremos em menos de 6 meses', value:'2'},
    {label:'Atingiremos 7 a 12 meses', value:'3'},
    {label:'Atingiremos 12 a 18 meses', value:'4'},
    {label:'Atingiremos 19 a 24 meses', value:'5'},
    {label:'Atingiremos m mais de 24 meses', value:'6'},
  ];

  const timeBreakevenAfterInvestment = [ 
    {label:'Vamos continuar no Breakeven', value:'1'},
    {label:'Menos de 6 meses', value:'2'},
    {label:'De 7 a 12 meses', value:'3'},
    {label:'De 12 a 18 meses', value:'4'},
    {label:'De 19 a 24 meses', value:'5'},
    {label:'Mais de 24 meses', value:'6'},
  ];

  const searchInvestment = [ 
    {label:'Sim, estou em captação', value:'1'},
    {label:'Ainda não, mas pretendo em breve', value:'2'},
    {label:'Não', value:'3'},
  ];

  const manyMonthsInvestmentLast = [ 
    {label:'Menos de 6 meses', value:'1'},
    {label:'De 7 a 12 meses', value:'2'},
    {label:'De 12 a 18 meses', value:'3'},
    {label:'De 19 a 24 meses', value:'4'},
    {label:'Mais de 24 meses', value:'5'},
  ];

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();
      }, 1000);
    }

  }, []);

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

                      <StartupInfoLine>
                        <BiMap size={12}/>
                        <p>{startup.city.name} - {startup.state.code}, {startup.country.name}</p>
                      </StartupInfoLine>
                      <StartupInfoLine>
                        <BiTime size={12}/>
                        <p>Fundada em: {format(new Date(startup.fundationDate), 'dd/MM/yyyy')}</p>
                      </StartupInfoLine>
                      <br />
                      
                      <StartupInfoLine>
                        <BsBarChart size={12}/>
                        <p>Fase: {phase.find(phas => phas.value === startup.phase.toString())?.label}</p>
                      </StartupInfoLine>
                      <StartupInfoLine>
                        <MdAttachMoney size={12}/>
                        <p>Modelo de negócio: {businessModel.find(businessMod => businessMod.value === startup.businessModel.toString())?.label}</p>
                      </StartupInfoLine>
                      <StartupInfoLine>
                        <AiOutlineNodeIndex size={12}/>
                        <p>Segmento: {segment.find(seg => seg.value === startup.segment.toString())?.label}</p>
                      </StartupInfoLine>
                      <br />

                      {startup.site && (
                        <>                  
                        <StartupInfoLine>
                          <MdComputer size={12}/>
                          <a target="_blank" href={startup.site}><p>{startup.name}</p></a>
                        </StartupInfoLine>
                        <br />
                        </>
                      )}
                      
                    </StartupInfo>
                    
                    <StartupInfo>
                      <StartupInfoMoney>
                        <StartupInfoMoneyValuation>{Number(startup.valuation).toLocaleString('pt-BR', formatCurrencyBRL)}</StartupInfoMoneyValuation>
                        <StartupInfoMoneyValuationAlter>
                          <p><AiOutlineUp /> 5%</p>
                        </StartupInfoMoneyValuationAlter>
                      </StartupInfoMoney>
                      
                      <StartupInfoButtons>
                        <Button className="revert" >Match</Button>
                        <Button>Investir</Button>
                      </StartupInfoButtons>
                    </StartupInfo>
                  </StartupInfoDiv>
                </Container>
              </ContainerPrimaryLeft>

              <ContainerPrimaryRight>
                <Panel>
                  <ContainerRight>
                    <ContainerRightTitle>
                      <h3>Rodada de Investimento</h3>
                    </ContainerRightTitle>
                    <ContainerRightContent>
                      <CatchmentRange 
                        defaultValue={60}
                        label={`Captação em ${60}%`}
                        labelStart="0%"
                        labelEnd="100%"
                      />

                      <Button>Investir</Button>

                      <InvestmentInfos>
                        <InvestmentInfo>
                          <h5>Rodada:</h5>
                          <p>1</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Captado:</h5>
                          <p>{(1189000).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Valuation:</h5>
                          <p>{(10000000).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Participação:</h5>
                          <p>15%</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Valor Ação:</h5>
                          <p>{(10).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Lote mínimo:</h5>
                          <p>100</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Valor Mínimo:</h5>
                          <p>{(1000).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Mínimo:</h5>
                          <p>{(1000000).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Máximo:</h5>
                          <p>{(1500000).toLocaleString('pt-BR', formatCurrencyBRL)}</p>
                        </InvestmentInfo>
                        <InvestmentInfo>
                          <h5>Fecha:</h5>
                          <p>{format(new Date(), 'dd/MM/yyyy')}</p>
                        </InvestmentInfo>
                      </InvestmentInfos>
                    </ContainerRightContent>
                  </ContainerRight>
                </Panel>
              </ContainerPrimaryRight>
            </ContainerPrimary>

            <Container className="leftMargin">
              <ContainerNeedMatch>
                <ContainerNeedMatchText><FiAlertTriangle /> Para obter mais informações sobre a Startup é necessário solicitar o <a>Match</a>, assim eles irão avaliar 
                  e liberar para você ter acesso a informações mais sensiveis e úteis para uma análise mais completa.
                </ContainerNeedMatchText>
              </ContainerNeedMatch>
            </Container>

            <Container className="leftMargin">
              <ContainerHeader>
                <h1>Sobre</h1>
              </ContainerHeader>
              <div>
                {startup.description}
              </div>
            </Container>


            {/* <Container className="leftMargin">
              <ContainerHeader>
                <h1>Problema</h1>
              </ContainerHeader>
              <div>
              </div>
            </Container>

            <Container className="leftMargin">
              <ContainerHeader>
                <h1>Modelo de negócio</h1>
              </ContainerHeader>
              <div>
              </div>
            </Container>

            <Container className="leftMargin">
              <ContainerHeader>
                <h1>Mercado</h1>
              </ContainerHeader>
              <div>
              </div>
            </Container> */}

            <Container className="space inverted">
              <ContainerHeaderCenter>
                <h1>Parceiros</h1>
                <p>As pessoas que auxiliam no crescimento da {startup?.name}</p>
                <Separator />
              </ContainerHeaderCenter>

              <ContainerContent>
                <DashNumberDiv>
                  {startup.clientsNumber > 0 ? (
                    <h1>{startup.clientsNumber.toLocaleString('pt-BR')}</h1>
                  ) : (
                    <h3>Em busca</h3>
                  )}
                  <p>Clientes</p>
                </DashNumberDiv>
                <DashNumberDiv>
                  {startup.partnersNumber > 0 ? (
                    <h1>{startup.partnersNumber.toLocaleString('pt-BR')}</h1>
                  ) : (
                    <h3>Em busca</h3>
                  )}
                  <p>Parceiros</p>
                </DashNumberDiv>
              </ContainerContent>
            </Container>

            <Container className="space">
              <ContainerHeaderCenter>
                <h1>Liderança</h1>
                <p>Sócios da {startup?.name}</p>
                <Separator />
              </ContainerHeaderCenter>

              <Leaderships>
                { leaders.map(leader => (
                  <Leadership>
                    <LeadershipImage>
                      { leader.imageUrl ? (
                        <>
                          <img src={leader.imageUrl} alt={leader.name} />
                          <LeadershipImageFunctionIcon>
                            <FaUserTie />
                          </LeadershipImageFunctionIcon>
                        </>
                      ) : (
                        <>
                        <LeadershipImageIcon>
                          <FaUserAstronaut size={30} />
                        </LeadershipImageIcon>

                        <LeadershipImageFunctionIcon>
                          <FaUserAstronaut />
                        </LeadershipImageFunctionIcon>
                        </>
                      )}
                    </LeadershipImage>
                    <LeadershipText>
                      <h5>{leader.name}</h5>
                      <p>{leader.position}</p>
                      <LeadershipTextSocialIcons>
                        {leader?.linkedin && (<AiFillLinkedin size={30} />)}
                        {leader?.twitter && (<AiOutlineTwitter size={30} />)}
                        {leader?.instagram && (<AiOutlineInstagram size={30} />)}
                      </LeadershipTextSocialIcons>
                    </LeadershipText>
                  </Leadership>
                )) }                  
              </Leaderships>
            </Container>

            <Container className="space">
              <ContainerHeaderCenter>
                <h1>Equipe</h1>
                <p>As pessoas por trás da {startup?.name}</p>
                <Separator />
              </ContainerHeaderCenter>

              <Leaderships>
                { team.map(people => (
                  <Leadership>
                    <LeadershipImage>
                      { people.imageUrl ? (
                        <>
                          <img src={people.imageUrl} alt={people.name} />
                          <LeadershipImageFunctionIcon>
                            <BiCodeAlt />
                          </LeadershipImageFunctionIcon>
                        </>
                      ) : (
                        <>
                        <LeadershipImageIcon>
                          <FaUserAstronaut size={30} />
                        </LeadershipImageIcon>

                        <LeadershipImageFunctionIcon>
                          <BiCodeAlt />
                        </LeadershipImageFunctionIcon>
                        </>
                      )}
                    </LeadershipImage>
                    <LeadershipText>
                      <h5>{people.name}</h5>
                      <p>{people.position}</p>
                      <LeadershipTextSocialIcons>
                        {people?.linkedin && (<AiFillLinkedin size={30} />)}
                        {people?.twitter && (<AiOutlineTwitter size={30} />)}
                        {people?.instagram && (<AiOutlineInstagram size={30} />)}
                      </LeadershipTextSocialIcons>
                    </LeadershipText>
                  </Leadership>
                )) }                  
              </Leaderships>
            </Container>

            <Container className="space">
              <ContainerHeaderCenter>
                <h1>Isto é {startup.name}</h1>
                <Separator />
              </ContainerHeaderCenter>
              <ThisIsDiv>
                <ThisIsItem>
                  <h3>Missão</h3>
                  <p>Acelerar e facilitar o encontro entre investidores e startups, de forma segura e simples.</p>
                </ThisIsItem>
                <ThisIsItem>
                  <h3>Visão</h3>
                  <p>Ser referência nacional em apresentação e investimentos em startups, 
                    com ampla linha de serviços, provendo soluções eficientes e completas.</p>
                </ThisIsItem>
                <ThisIsItem>
                  <h3>Valores</h3>
                  <p>Velocidade, Eficiência, Flexibilidade, Automação e Inovação são alguns de nossos valores mais importantes.</p>
                </ThisIsItem>
              </ThisIsDiv>
            </Container>
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
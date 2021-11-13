import React from 'react';

import { 
  Container, 
  ContainerRight,
  ContainerRightTitle,
  ContainerRightContent,
  InvestmentInfos,
  InvestmentInfo,
} from './styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CatchmentRange from '../../PageInternal/Startups/Page/CatchmentRange';
import Panel from '../../Panel';
import { Button } from '../../Button';
import format from 'date-fns/format';

interface IRoundInvestmentCardProps {
  hasMatch: boolean;
}
export function RoundInvestmentCard({ hasMatch }: IRoundInvestmentCardProps) {
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

  const formatCurrencyBRL = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

  return (
    <Container>
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
            
            {hasMatch && (
              <>
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
              </>
            )}
          </ContainerRightContent>
        </ContainerRight>
      </Panel>
    </Container>
  );
}

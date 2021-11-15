import React, { ReactNode } from 'react';

import { LoadingPlayerPanel } from '../Shimmer/LoadingPlayerPanel';
import { PlayerPanel } from './PlayerPanel';
import { ProfilePanel } from './ProfilePanel';

import { Container } from './styles';
import MenuPanel from './MenuPanel';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';
import { UserPanel } from './UserPanel';
import { UserInfosPanel } from './UserInfosPanel';
import { IUserDTOS } from '../../dtos/IUserDTOS';
import { IInvestorsDTOS } from '../../dtos/IInvestorsDTOS';

interface ILeftColumnProps {
  investor?: IInvestorsDTOS;
  infos?: {
    startups: number;
    investiments: number;
    matchs: number;
  }
}

export function LeftColumn({ investor, infos }: ILeftColumnProps) {
  const { isLoading } = useApplicationStartUni();

  return (
    <Container className="left-column">
      {isLoading ? (
        // <LoadingPlayerPanel />
        <LoadingProfilePanel />
      ) : (
        <>
        {/* <PlayerPanel /> */}
        <UserPanel investor={investor}/>
        <UserInfosPanel infos={infos}/>
        </>
      )}
    </Container>
  );
};

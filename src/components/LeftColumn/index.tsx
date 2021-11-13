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

interface ILeftColumnProps {
  infos?: {
    startups: number;
    investiments: number;
    matchs: number;
  }
}

export function LeftColumn({ infos }: ILeftColumnProps) {
  const { isLoading } = useApplicationStartUni();

  return (
    <Container className="left-column">
      {isLoading ? (
        // <LoadingPlayerPanel />
        <LoadingProfilePanel />
      ) : (
        <>
        {/* <PlayerPanel /> */}
        <UserPanel />
        <UserInfosPanel infos={infos}/>
        </>
      )}
    </Container>
  );
};

import React, { ReactNode } from 'react';

import { LoadingPlayerPanel } from '../Shimmer/LoadingPlayerPanel';
import { PlayerPanel } from './PlayerPanel';
import { ProfilePanel } from './ProfilePanel';

import { Container } from './styles';
import MenuPanel from './MenuPanel';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';

export function LeftColumn() {
  const { isLoading } = useApplicationStartUni();

  return (
    <Container className="left-column">
      {isLoading ? (
        // <LoadingPlayerPanel />
        <LoadingProfilePanel />
      ) : (
        <>
        {/* <PlayerPanel /> */}
        <ProfilePanel />
        {/* <MenuPanel /> */}
        </>
      )}
    </Container>
  );
};

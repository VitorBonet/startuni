import React from 'react';

import Panel from '../../Panel';
import Skeleton from '../../Skeleton';

import { 
  Container,
  PlayerVideo,
  PlayerLine,
 } from './styles';

export function LoadingPlayerPanel() {
  return (
    <Container>
      <Panel className="no-shadow">
        <PlayerVideo>
          <Skeleton className="bg-skeleton" />
        </PlayerVideo>

        <PlayerLine>
          <Skeleton className="row-skeleton" />
        </PlayerLine>

        <span>
          <Skeleton className="row-skeleton" />
          <Skeleton className="row-skeleton" />
          <Skeleton className="row-skeleton" />
          <Skeleton className="row-skeleton" />
          <Skeleton className="row-skeleton" />
        </span>
      </Panel>
    </Container>
  );
}
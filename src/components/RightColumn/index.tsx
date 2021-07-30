import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel';
import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
interface IRightColumnProps {
  isLoading: boolean;
}

export function RightColumn({ isLoading }: IRightColumnProps) {
  return (
    <Container className="right-column">
      { isLoading ? (
        <>
          <LoadingTrendingPanel />
        </>
      ) : (
        <>
          <TrendingPanel />
          <TrendingPanel />
        </>
      ) }
    </Container>
  );
};

import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel';
import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';

export function RightColumn() {
  const { isLoading } = useApplicationStartUni();

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

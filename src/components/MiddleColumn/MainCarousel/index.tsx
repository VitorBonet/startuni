import React from 'react';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';

import Panel from '../../Panel';
// import LoadingMainCarousel from '../../Shimmer/LoadingMainCarousel';

import {
  Container,
  WriteIcon,
  MusicIcon,
  PlusIcon,
  CalendarIcon,
} from './styles';

export function MainCarousel() {
  const { isLoading } = useApplicationStartUni();
  return (
    <>
    {isLoading ? (
      // <LoadingMainCarousel />
      <div></div>
    ) : (
      <Container>
        <div className="attachment">
        </div>
      </Container>
    )}
    </>
    
  );
};

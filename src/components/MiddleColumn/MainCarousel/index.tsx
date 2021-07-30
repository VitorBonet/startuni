import React from 'react';
import { useApplicationCisum } from '../../../contexts/ApplicationCisumContext';

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
  const { isLoading } = useApplicationCisum();
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

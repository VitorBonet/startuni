import React, { useEffect, useState } from 'react';

import { 
  Body, 
  Content,
  OptionsDiv,
  Option,
  StartupCards,
  NotFoundStartupsDiv,
} from '../../styles/startups/styles';
import { PrivatePage } from '../../components/PrivatePage';
import { useApplicationStartUni } from '../../contexts/ApplicationStartUniContext';
import { StartupCard } from '../../components/Cards/StartupCard';

export default function Startups() {
  const { isLoading, loading } = useApplicationStartUni();

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();
      }, 1000);
    }

  }, []);

  return (
    <>
      <PrivatePage title="">
        <Body>
          <Content>
            <h2>StartUps</h2>
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}
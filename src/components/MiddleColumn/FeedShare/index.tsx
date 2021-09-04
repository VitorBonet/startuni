import router from 'next/router';
import React, { useState } from 'react';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';

import Panel from '../../Panel';
import LoadingFeedShare from '../../Shimmer/LoadingFeedShare';

import {
  Container,
  ImageIcon,
  VideoIcon,
  TextIcon,
  CalendarIcon,
} from './styles';

export function FeedShare() {
  const { isLoading } = useApplicationStartUni();

  return (
    <>
    {isLoading ? (
      <LoadingFeedShare />
    ) : (
      <>
      <Panel>
        <Container>
          {/* <div className="write">
            <WriteIcon />
            <span>Começar uma publicação</span>
          </div> */}
          <div className="attachment">
            <button onClick={() => router.push('images')} >
              <ImageIcon />
              Foto
            </button>
            <button onClick={() => router.push('videos')} >
              <VideoIcon />
              Video
            </button>
            <button onClick={() => router.push('events')} >
              <CalendarIcon />
              Evento
            </button>
            <button onClick={() => router.push('texts')} >
              <TextIcon />
              Texto
            </button>
          </div>
        </Container>
      </Panel>
      </>
    )}
    </>
    
  );
};

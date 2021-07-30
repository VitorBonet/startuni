import router from 'next/router';
import React, { useState } from 'react';
import { useApplicationCisum } from '../../../contexts/ApplicationCisumContext';

import Panel from '../../Panel';
import LoadingFeedShare from '../../Shimmer/LoadingFeedShare';

import {
  Container,
  WriteIcon,
  MusicIcon,
  PlusIcon,
  CalendarIcon,
} from './styles';

export function FeedShare() {
  const { isLoading } = useApplicationCisum();

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
            <button onClick={() => router.push('tracks')} >
              <MusicIcon />
              Upload Track
            </button>
            <button onClick={() => router.push('images')} >
              <PlusIcon />
              Add Image
            </button>
            <button onClick={() => router.push('lyrics')} >
              <MusicIcon />
              Add Lyrics
            </button>
            <button onClick={() => router.push('events')} >
              <CalendarIcon />
              Creat an Event
            </button>
          </div>
        </Container>
      </Panel>
      </>
    )}
    </>
    
  );
};

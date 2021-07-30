import React, { useRef } from 'react';

import { Container, PreviewDiv } from './styles';

interface PreviewTrackProps {
  track: File;
}

const PreviewTrack: React.FC<PreviewTrackProps> = ({ track }: PreviewTrackProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <Container>
      <PreviewDiv>
        <video 
          src={URL.createObjectURL(track)}
          controls
          ref={videoRef}
          style={{ width: '100%' }}
        />
      </PreviewDiv>
    </Container>
  );
};

export default PreviewTrack;
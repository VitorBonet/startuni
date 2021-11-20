import React, { useRef } from 'react';

import { Container, PreviewDiv } from './styles';

// interface FileProps {
//   file: File;
//   name: string;
//   readableSize: string;
// }

interface PreviewTrackProps {
  image: File;
}

const PreviewImage: React.FC<PreviewTrackProps> = ({ image }: PreviewTrackProps) => {
  return (
    <Container>
      <PreviewDiv >
        <img 
          src={typeof image === 'string' ? `${process.env.APP_API_URL}/files/images/${image}` : window.URL.createObjectURL(image)}
        />
      </PreviewDiv>
    </Container>
  );
};

export default PreviewImage;
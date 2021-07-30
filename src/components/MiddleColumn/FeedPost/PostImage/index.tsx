import React from 'react';

import {
  Container,
  PostImageTitle,
  PostImageImg,
} from './styles';

interface IImage {
  id: string;
  name: string;
  imageUrl: string;
}

interface IPostImageProps {
  image: IImage;
}

export function PostImage({ image }: IPostImageProps) {
  
  return (
    <Container>
      <PostImageTitle>{image.name}</PostImageTitle>
      <PostImageImg
        src={image.imageUrl}
        alt={image.name}
      />
    </Container>
  );
};

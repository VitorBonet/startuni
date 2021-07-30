import React from 'react';

import {
  Container,
  Title,
  Lyric,
} from './styles';

interface ILyric {
  id: string;
  name: string;
  lyrics: string;
}

interface IPostLyricProps {
  lyric: ILyric;
}

export function PostLyric({ lyric }: IPostLyricProps) {
  
  return (
    <Container>
      <Title>
        <h3>{lyric.name}</h3>
      </Title>
      <Lyric>{lyric.lyrics}</Lyric>
    </Container>
  );
};

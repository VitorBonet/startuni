import React from 'react';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';

import Panel from '../../Panel';
// import LoadingMainCarousel from '../../Shimmer/LoadingMainCarousel';

import {
  Container,
  LeftButton,
  ListArea,
  List,
  Item,
  RightButton,
} from './styles';

export function MusicCarousel() {
  const { isLoading } = useApplicationStartUni();
  return (
    <>
    {isLoading ? (
      // <LoadingMainCarousel />
      <div></div>
    ) : (
      <Container>
        <h2>Titulo</h2>
        <ListArea>
          <LeftButton />
          <RightButton />
          <List>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/trackImg.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/trackImg.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/trackImg.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/pinkFloyd.png" alt="Music Image"/>
            </Item>
            <Item>
              <img src="/images/trackImg.png" alt="Music Image"/>
            </Item>
          </List>
        </ListArea>
      </Container>
    )}
    </>
    
  );
};

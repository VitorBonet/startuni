import React from 'react';

import { format } from 'date-fns';
import enUs from 'date-fns/locale/en-US';
import { BiTimeFive, BiMap} from 'react-icons/bi'; 

import {
  Container,
  PostEventTitle,
  PostEventTitleDate,
  PostEventTitleAddress,
  PostEventImg,
} from './styles';

interface IEvent {
  id: string;
  name: string;
  date: string;
  address: string;
  description: string;
  imageUrl: string;
}

interface IPostEventProps {
  event: IEvent;
}

export function PostEvent({ event }: IPostEventProps) {

  const dateEvent = format(new Date(event.date), "do 'de' MMMM yyyy", {
    locale: enUs
  })
  
  return (
    <Container>
      <PostEventTitle>
        <h3>{event.name}</h3>
        <PostEventTitleDate>
          <BiTimeFive />
          <p>{dateEvent}</p>
        </PostEventTitleDate>
        <PostEventTitleAddress>
          <BiMap />
          <p>{event.address}</p>
        </PostEventTitleAddress>
        <p>{event.description}</p>
      </PostEventTitle>
      <PostEventImg
        src={event.imageUrl ?? '/images/default-event.jpg'}
        alt={event.name}
      />
    </Container>
  );
};

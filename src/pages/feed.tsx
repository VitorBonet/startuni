import React, { useEffect, useState } from 'react';

import { 
  Body, 
  Content,
} from '../styles/home/styles';
import { PrivatePage } from '../components/PrivatePage';
import { LeftColumn } from '../components/LeftColumn';
import { MiddleColumn } from '../components/MiddleColumn';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FeedShare } from '../components/MiddleColumn/FeedShare';
import { RightColumn } from '../components/RightColumn';
import { useApplicationStartUni } from '../contexts/ApplicationStartUniContext';
import FeedPost from '../components/MiddleColumn/FeedPost';

export default function Feed() {
  const { isLoading, loading } = useApplicationStartUni();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        loading();

        setFeed([
          {
            id: '1',
            userId: '1',
            user: {
              id: '1',
              email: 'jhondue@gmail.com',
              name: 'Jhon Due',
              avatarUrl: '/images/pexels-cottonbro.jpg',
            },
            imageId: '1',
            image: {
              id: '1',
              name: 'A felicidade vem com as pequenas conquistas! Cada dia é uma aventura com essa equipe!',
              imageUrl: '/images/pexels-canva-studio.jpg',
            },
            type: 'l',
            like: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },          
          {
            id: '1',
            userId: '1',
            user: {
              id: '1',
              email: 'michael@gmail.com',
              name: 'Michael Burrows',
              avatarUrl: '/images/pexels-michael-burrows.jpg',
            },
            imageId: '1',
            image: {
              id: '1',
              name: '😉',
              imageUrl: '/images/pexels-michael-burrows.jpg',
            },
            type: 'l',
            like: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }, 1000);
    }

  }, []);

  return (
    <>
      <PrivatePage title="">
        <Body>
          <Content>
          <LeftColumn />
          <MiddleColumn className="feed">
            <FeedShare />
              <div>
                { feed.map((post, index) => (
                  // <div key={post.id} ref={index === feed.length - 1 ? infiniteScrollLastItemRef : undefined}>
                    <FeedPost post={post} />
                  // </div>
                )) }
                <LoadingSpinner visible={isLoading} />
              </div>
          </MiddleColumn>
          <RightColumn />
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}
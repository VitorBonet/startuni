import React, { useEffect } from 'react';

import { 
  Body, 
  Content,
} from '../styles//home/styles';
import { PrivatePage } from '../components/PrivatePage';
import { LeftColumn } from '../components/LeftColumn';
import { MiddleColumn } from '../components/MiddleColumn';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FeedShare } from '../components/MiddleColumn/FeedShare';
import { RightColumn } from '../components/RightColumn';
import { useApplicationStartUni } from '../contexts/ApplicationStartUniContext';

export default function Home() {
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
          <LeftColumn />
          <MiddleColumn>
            <FeedShare />
              <div>
                {/* { feed.map((post, index) => (
                  <div key={post.id} ref={index === feed.length - 1 ? infiniteScrollLastItemRef : undefined}>
                    <FeedPost post={post} />
                  </div>
                )) } */}
                <LoadingSpinner visible={true} />
              </div>
          </MiddleColumn>
          <RightColumn />
          </Content>
        </Body>
      </PrivatePage>
    </>
  );
}
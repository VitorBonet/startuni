import React, { ReactNode } from 'react';
import Head from 'next/head';

import { Container, MainPage } from './styles';
import { Header } from '../Header';
import AdBanner from '../AdBanner';

interface IPageInternalProps {
  title: string;
  isLoading: boolean;
  withBanner?: boolean;
  children: ReactNode;
}

export function PageInternal({title, isLoading, withBanner = true, children}: IPageInternalProps) { 

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Container>
          <Header />
            { withBanner && !isLoading && (
              <span>
                <AdBanner />
              </span>
            ) }
            
            <MainPage>
                {children}
            </MainPage>
        </Container>
      </main>
    </>
  );
}

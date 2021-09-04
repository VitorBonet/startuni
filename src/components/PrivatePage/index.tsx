import Head from 'next/head'
import React, { useState, ReactNode } from 'react';
import { GetStaticProps } from 'next';

import { 
  Container, 
} from './styles';
import { LeftSideBar } from '../LeftSideBar';
import DesktopHeader from '../DesktopHeader';

interface IPrivatePageProps {
  children?: ReactNode;
  title: string;
}

export function PrivatePage({ children, title }: IPrivatePageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Container>
          <LeftSideBar />
          <DesktopHeader />

          {children}
        </Container>
      </main>
    </>
  );
}
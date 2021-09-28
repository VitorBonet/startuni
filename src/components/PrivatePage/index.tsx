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
  withLeftBar?: boolean;
  withHeader?: boolean;
}

export function PrivatePage({ children, title, withLeftBar = true, withHeader = true }: IPrivatePageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Container>
          {withLeftBar && (<LeftSideBar />)}
          {withHeader && (<DesktopHeader />)}

          {children}
        </Container>
      </main>
    </>
  );
}
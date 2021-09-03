import Head from 'next/head'
import React, { useState } from 'react';
import { GetStaticProps } from 'next';

import { 
  Container, 
} from '../styles/styles';
import { LeftSideBar } from '../components/LeftSideBar';
import DesktopHeader from '../components/DesktopHeader';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Home | StartUni</title>
      </Head>
      <main>
        <Container>
          <LeftSideBar />
          <DesktopHeader />
        </Container>
      </main>
    </>
  );
}
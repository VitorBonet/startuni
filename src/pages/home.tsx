import Head from 'next/head'
import React from 'react';
import { GetStaticProps } from 'next';

import { 
  Container, 
} from '../styles/styles';
import { LeftSideBar } from '../components/LeftSideBar';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Home | StartUni</title>
      </Head>
      <main>
        <LeftSideBar />
      </main>
    </>
  );
}
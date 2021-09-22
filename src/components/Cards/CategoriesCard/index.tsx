import React from 'react';

import { 
  Container, 
} from './styles';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function CategoriesCard() {
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

  return (
    <>
      
    </>
  );
}

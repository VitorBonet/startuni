import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { 
  AiOutlineUser,
  AiFillHome,
} from 'react-icons/ai';
import { IoIosRocket } from 'react-icons/io';
import { BiWallet } from 'react-icons/bi';

import { 
  Container, 
  ButtonExpandHeader,
  ProfileCircle, 
  ProfileIconCircle,
  CaretDownIconProfileIcon,
  SideBarContainer,
  HeaderSideBar,
  HeaderSideBarCloseIcon,
  BodySideBar,
  ItemSideBar,
  ImageSideBar,
  ImageSideBarText,
  FooterSideBar,
  SideBarUser,
  SideBarUserText,
} from './styles';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function LeftSideBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [menuURL, setMenuURL] = useState('');

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

  useEffect(() => {
    if (window && window.location && window.location.href) {
      setMenuURL(window.location.href);
    }
  }, []) 
  return (
    <>
    {/* <Container> */}
      {/* { user?.avatarUrl ? (
          <>
            <ProfileCircle src={user.avatarUrl}/>
          </>
        ) : (
          <ProfileIconCircle>
            <AiOutlineUser />
            <CaretDownIconProfileIcon />
          </ProfileIconCircle>
        )} */}
    {/* </Container> */}

    
    <SideBarContainer className={sideBarOpen ? 'open' : ''}>
      <HeaderSideBar className={sideBarOpen ? 'open' : ''}>
        {sideBarOpen ? (<HeaderSideBarCloseIcon onClick={showSideBar}/>) : (<ButtonExpandHeader onClick={showSideBar} />)}        
      </HeaderSideBar>

      <BodySideBar>
        <ItemSideBar className={`${menuURL.indexOf("home") > -1 && 'active'} ${sideBarOpen && 'open' }`}>
          <Link href="/home">
            <div className={menuURL.indexOf("home") > -1 && 'active'}>
              <AiFillHome />
              <label>Feed</label>
            </div>
          </Link>
        </ItemSideBar>
        <ItemSideBar className={`${menuURL.indexOf("startups") > -1 && 'active'} ${sideBarOpen && 'open' }`}>
          <Link href="/startups">
            <div className={menuURL.indexOf("startups") > -1 && 'active'}>
              <IoIosRocket />
              <label>Startups</label>
            </div>
          </Link>
        </ItemSideBar>
        <ItemSideBar className={`${menuURL.indexOf("wallet") > -1 && 'active'} ${sideBarOpen && 'open' }`}>
          <Link href="/wallet">
            <div className={menuURL.indexOf("wallet") > -1 && 'active'}>
              <BiWallet />
              <label>Wallet</label>
            </div>
          </Link>
        </ItemSideBar>
      </BodySideBar>

      <div>
        <ImageSideBar className={sideBarOpen ? 'open' : ''}>
          <img src="/rocketIcon.svg" alt="rocket" />
          <ImageSideBarText>
            <h3>Startup Universe</h3>
            <label>O espaço é apenas o começo...</label>
          </ImageSideBarText>
        </ImageSideBar>

        {/* <FooterSideBar>
          <SideBarUser>
            <AiOutlineUser />
          </SideBarUser>
          <SideBarUserText className={sideBarOpen ? 'open' : ''}>
            <h3>Vitor Bonet</h3>
            <label>Admin</label>
          </SideBarUserText>
        </FooterSideBar> */}
      </div>
    </SideBarContainer>
    </>
  );
}

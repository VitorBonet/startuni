import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
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

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

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
        <ItemSideBar className={`active ${sideBarOpen && 'open' }`}>
          <div className={'active'}>
            <AiFillHome />
            <label>Home</label>
          </div>
        </ItemSideBar>
        <ItemSideBar className={sideBarOpen ? 'open' : ''}>
          <div>
            <IoIosRocket />
            <label>Startups</label>
          </div>
        </ItemSideBar>
        <ItemSideBar className={sideBarOpen ? 'open' : ''}>
          <div>
            <BiWallet />
            <label>Wallet</label>
          </div>
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

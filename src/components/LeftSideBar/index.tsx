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
  FooterSideBar,
  SideBarUser,
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
    <Container>
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
    </Container>

    
    <SideBarContainer className={sideBarOpen ? 'active' : ''}>
      <HeaderSideBar>
        <ButtonExpandHeader onClick={showSideBar} />
        {/* <HeaderSideBarCloseIcon onClick={showSideBar}/> */}
      </HeaderSideBar>

      <BodySideBar>
        <ItemSideBar className={'active'}>
          <div className={'active'}>
            <AiFillHome />
          </div>
        </ItemSideBar>
        <ItemSideBar className={sideBarOpen ? 'active' : ''}>
          <div>
            <IoIosRocket />
          </div>
        </ItemSideBar>
        <ItemSideBar className={sideBarOpen ? 'active' : ''}>
          <div>
            <BiWallet />
          </div>
        </ItemSideBar>
      </BodySideBar>

      <FooterSideBar>
        <SideBarUser>
          <AiOutlineUser />
        </SideBarUser>
      </FooterSideBar>
    </SideBarContainer>
    </>
  );
}

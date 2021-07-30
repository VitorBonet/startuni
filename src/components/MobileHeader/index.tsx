import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AiOutlineArrowLeft, 
  AiOutlineArrowRight,
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
  AiOutlineUser,
  AiOutlinePoweroff,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload 
} from 'react-icons/ai';
import { FaStream } from 'react-icons/fa'
import { RiPagesFill, RiFolderMusicFill } from 'react-icons/ri'
import { MdLibraryBooks, MdLibraryMusic, MdEventAvailable } from 'react-icons/md'
import { BiGroup, BiCalendarEvent } from 'react-icons/bi'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { GiMusicalScore } from 'react-icons/gi'

import { 
  Container, 
  ButtonExpandHeader,
  ProfileCircle, 
  ProfileIconCircle,
  CaretDownIconProfileIcon,
  SideBarContainer,
  HeaderSideBar,
  HeaderSideBarCloseIcon,
  BodySideBarDiv,
  BodySide,
  BodySideItem,
  BodySideItemText,
  BodySideItemIconDiv,
} from './styles';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';

const MobileHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main'); // settings animals
  const [menuHeight, setMenuHeight] = useState(null); 

  const showSideBar = () => setSideBarOpen(!sideBarOpen);

  function caclHeight(el) {
    const heigth = el.offsetHeight;
    setMenuHeight(heigth)
  }

  return (
    <>
    <Container>
      <ButtonExpandHeader onClick={showSideBar} />
      { user?.avatarUrl ? (
          <>
            <ProfileCircle src={user.avatarUrl}/>
          </>
        ) : (
          <ProfileIconCircle>
            <AiOutlineUser />
            <CaretDownIconProfileIcon />
          </ProfileIconCircle>
        )}
    </Container>

    
    <SideBarContainer className={sideBarOpen ? 'active' : ''}>
      <HeaderSideBar>
        <HeaderSideBarCloseIcon onClick={showSideBar}/>
      </HeaderSideBar>

      <BodySideBarDiv>
            <BodySide>
              <CSSTransition style={{ height: menuHeight }}
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                className="menu-primary"
                onEnter={caclHeight}
              >
                <div className="menu" >
                  <BodySideItem onClick={() => router.push('/feed')}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <RiPagesFill />
                      </BodySideItemIconDiv>
                      Feed
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineMessage />
                      </BodySideItemIconDiv>
                      Messaging
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineUsergroupAdd />
                      </BodySideItemIconDiv>
                      Supporters
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <FaStream />
                      </BodySideItemIconDiv>
                      Supporting
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem onClick={() => setActiveMenu('library')}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <RiFolderMusicFill />
                      </BodySideItemIconDiv>
                      My Library 
                    </BodySideItemText>
                    
                    <BodySideItemIconDiv>
                      <AiOutlineArrowRight />
                    </BodySideItemIconDiv>
                  </BodySideItem>

                  <BodySideItem onClick={() => setActiveMenu('stage')}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <MdLibraryBooks />
                      </BodySideItemIconDiv>
                      My Stage 
                    </BodySideItemText>
                    
                    <BodySideItemIconDiv>
                      <AiOutlineArrowRight />
                    </BodySideItemIconDiv>
                  </BodySideItem>

                  <BodySideItem onClick={() => setActiveMenu('groups')}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <BiGroup />
                      </BodySideItemIconDiv>
                      My Groups 
                    </BodySideItemText>
                    
                    <BodySideItemIconDiv>
                      <AiOutlineArrowRight />
                    </BodySideItemIconDiv>
                  </BodySideItem>

                  <BodySideItem onClick={() => router.push('/me')}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineUser />
                      </BodySideItemIconDiv>
                      Profile
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <MdLibraryMusic />
                      </BodySideItemIconDiv>
                      My Page
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem onClick={signOut}>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlinePoweroff />
                      </BodySideItemIconDiv>
                      Logout
                    </BodySideItemText>                  
                  </BodySideItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'library'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <BodySideItem onClick={() => setActiveMenu('main')}>
                    <BodySideItemIconDiv>
                      <AiOutlineArrowLeft />
                    </BodySideItemIconDiv>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineCloudUpload />
                      </BodySideItemIconDiv>
                      Upload a file
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <BsMusicNoteBeamed />
                      </BodySideItemIconDiv>
                      My Music
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <GiMusicalScore />
                      </BodySideItemIconDiv>
                      My Lyrics
                    </BodySideItemText>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineCloudDownload />
                      </BodySideItemIconDiv>
                      My Downloads
                    </BodySideItemText>
                  </BodySideItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'stage'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <BodySideItem onClick={() => setActiveMenu('main')}>
                    <BodySideItemIconDiv>
                      <AiOutlineArrowLeft />
                    </BodySideItemIconDiv>
                  </BodySideItem>

                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <BiCalendarEvent />
                      </BodySideItemIconDiv>
                      Events
                    </BodySideItemText>
                  </BodySideItem>
                  
                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <MdEventAvailable />
                      </BodySideItemIconDiv>
                      Attending
                    </BodySideItemText>
                  </BodySideItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'groups'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <BodySideItem onClick={() => setActiveMenu('main')}>
                    <BodySideItemIconDiv>
                      <AiOutlineArrowLeft />
                    </BodySideItemIconDiv>
                  </BodySideItem>
                  
                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <BiGroup />
                      </BodySideItemIconDiv>
                      Created Groups
                    </BodySideItemText>
                  </BodySideItem>
                  
                  <BodySideItem>
                    <BodySideItemText>
                      <BodySideItemIconDiv>
                        <AiOutlineUsergroupAdd />
                      </BodySideItemIconDiv>
                      Joined Groups
                    </BodySideItemText>
                  </BodySideItem>
                </div>
              </CSSTransition>
            </BodySide>
        </  BodySideBarDiv>
    </SideBarContainer>
    </>
  );
}

export default MobileHeader;
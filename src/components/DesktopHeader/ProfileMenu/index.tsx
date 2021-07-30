import { ReactNode, useState } from 'react';
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
import { CSSTransition } from 'react-transition-group';

import { 
  Container,
  ProfileCircle,
  ProfileIconCircle,
  CaretDownIcon,
  CaretDownIconProfileIcon,
  DropDownDiv,
  DropDown,
  DropDownItem,
  DropDownItemText,
  DropDownItemIconDiv,
} from './styles';
import { useAuth } from '../../../contexts/AuthContext';
import { Router, useRouter } from 'next/router';

interface IProfileMenu {
  dropdownOpen : boolean;
  refDropdown: ReactNode;
  openDropdown: (e: Event) => void;
}

export function ProfileMenu({ dropdownOpen, refDropdown, openDropdown }: IProfileMenu) {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('main'); // settings animals
  const [menuHeight, setMenuHeight] = useState(null); 

  const { signOut } = useAuth();
  const router = useRouter();

  function caclHeight(el) {
    const heigth = el.offsetHeight;
    setMenuHeight(heigth)
  }

  return ( 
      <>
        <Container onClick={openDropdown} >
          { user?.avatarUrl ? (
            <>
            <ProfileCircle src={user.avatarUrl}/>
            <CaretDownIcon />
            </>
          ) : (
            <ProfileIconCircle>
              <AiOutlineUser />
              <CaretDownIconProfileIcon />
            </ProfileIconCircle>
          )}
        </Container>

        <DropDownDiv ref={refDropdown}>
          {dropdownOpen && (
            <DropDown>
              <CSSTransition style={{ height: menuHeight }}
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                className="menu-primary"
                onEnter={caclHeight}
              >
                <div className="menu" >
                  <DropDownItem onClick={() => router.push('/feed')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <RiPagesFill />
                      </DropDownItemIconDiv>
                      Feed
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineMessage />
                      </DropDownItemIconDiv>
                      Messaging
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineUsergroupAdd />
                      </DropDownItemIconDiv>
                      Supporters
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <FaStream />
                      </DropDownItemIconDiv>
                      Supporting
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem onClick={() => setActiveMenu('library')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <RiFolderMusicFill />
                      </DropDownItemIconDiv>
                      My Library 
                    </DropDownItemText>
                    
                    <DropDownItemIconDiv>
                      <AiOutlineArrowRight />
                    </DropDownItemIconDiv>
                  </DropDownItem>

                  <DropDownItem onClick={() => setActiveMenu('stage')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <MdLibraryBooks />
                      </DropDownItemIconDiv>
                      My Stage 
                    </DropDownItemText>
                    
                    <DropDownItemIconDiv>
                      <AiOutlineArrowRight />
                    </DropDownItemIconDiv>
                  </DropDownItem>

                  <DropDownItem onClick={() => setActiveMenu('groups')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <BiGroup />
                      </DropDownItemIconDiv>
                      My Groups 
                    </DropDownItemText>
                    
                    <DropDownItemIconDiv>
                      <AiOutlineArrowRight />
                    </DropDownItemIconDiv>
                  </DropDownItem>

                  <DropDownItem onClick={() => router.push('/me')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineUser />
                      </DropDownItemIconDiv>
                      Profile
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <MdLibraryMusic />
                      </DropDownItemIconDiv>
                      My Page
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem onClick={signOut}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlinePoweroff />
                      </DropDownItemIconDiv>
                      Logout
                    </DropDownItemText>                  
                  </DropDownItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'library'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <DropDownItem onClick={() => setActiveMenu('main')}>
                    <DropDownItemIconDiv>
                      <AiOutlineArrowLeft />
                    </DropDownItemIconDiv>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineCloudUpload />
                      </DropDownItemIconDiv>
                      Upload a file
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <BsMusicNoteBeamed />
                      </DropDownItemIconDiv>
                      My Music
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <GiMusicalScore />
                      </DropDownItemIconDiv>
                      My Lyrics
                    </DropDownItemText>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineCloudDownload />
                      </DropDownItemIconDiv>
                      My Downloads
                    </DropDownItemText>
                  </DropDownItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'stage'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <DropDownItem onClick={() => setActiveMenu('main')}>
                    <DropDownItemIconDiv>
                      <AiOutlineArrowLeft />
                    </DropDownItemIconDiv>
                  </DropDownItem>

                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <BiCalendarEvent />
                      </DropDownItemIconDiv>
                      Events
                    </DropDownItemText>
                  </DropDownItem>
                  
                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <MdEventAvailable />
                      </DropDownItemIconDiv>
                      Attending
                    </DropDownItemText>
                  </DropDownItem>
                </div>
              </CSSTransition>

              <CSSTransition
                in={activeMenu === 'groups'}
                unmountOnExit
                timeout={500}
                className="menu-secondary"
              >
                <div className="menu" >
                  <DropDownItem onClick={() => setActiveMenu('main')}>
                    <DropDownItemIconDiv>
                      <AiOutlineArrowLeft />
                    </DropDownItemIconDiv>
                  </DropDownItem>
                  
                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <BiGroup />
                      </DropDownItemIconDiv>
                      Created Groups
                    </DropDownItemText>
                  </DropDownItem>
                  
                  <DropDownItem>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineUsergroupAdd />
                      </DropDownItemIconDiv>
                      Joined Groups
                    </DropDownItemText>
                  </DropDownItem>
                </div>
              </CSSTransition>
            </DropDown>
          )}
        </DropDownDiv>
      </>
   );
}
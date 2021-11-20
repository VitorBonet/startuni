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
                  {/* <DropDownItem onClick={() => router.push('/investors/me')}>
                    <DropDownItemText>
                      <DropDownItemIconDiv>
                        <AiOutlineUser />
                      </DropDownItemIconDiv>
                      Perfil investidor
                    </DropDownItemText>
                  </DropDownItem> */}

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
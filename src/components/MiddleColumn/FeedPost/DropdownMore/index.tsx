import { useRouter } from 'next/router';
import { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useAuth } from '../../../../contexts/AuthContext';
import { enums } from '../../../../utils/enums';

import { 
  DropDownDiv,
  DropDown,
  DropDownItem,
  DropDownItemText,
  DropDownItemIconDiv,
} from './styles';

interface IPost {
  id: string;
  userId: string;
  user: {
    id: string;
    email: string;
    name: string;
    profileName: string;
    avatarUrl: string;
  };
  trackId?: string;
  imageId?: string;
  eventId?: string;
  lyricId?: string;
  type: 't' | 'i' | 'e' | 'l';
  like: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IDropdownMore {
  dropdownOpen : boolean;
  refDropdown: ReactNode;
  openDropdown: (e: Event) => void;
  post: IPost;
}

export function DropdownMore({ dropdownOpen, refDropdown, openDropdown, post }: IDropdownMore) {
  const { user } = useAuth();
  const router = useRouter();
  const [link, setLink] = useState('');

  useEffect(() => {
    switch (post.type) {
      case enums.posts.type.event:
        setLink('events/'+post.eventId);
        break;
      case enums.posts.type.image:
        setLink('images/'+post.imageId);
        break;
      case enums.posts.type.lyric:
        setLink('lyrics/'+post.lyricId);
        break;
      case enums.posts.type.track:
        setLink('tracks/'+post.trackId);
        break;
    }
  }, [])

  function deletePost() {
    var confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
        // await api.delete(`/me`).then(response => {
        // }).catch((err) => { console.log(err); });
      
    }
  }

  return ( 
      <>
        <DropDownDiv ref={refDropdown}>
          {dropdownOpen && (
            <DropDown>
              <div className="menu" >
                {(user.email === post.user.email) && (
                  <>
                    <DropDownItem>
                      <DropDownItemText onClick={() => router.push(link)}>
                        <DropDownItemIconDiv>
                          <AiFillEdit />
                        </DropDownItemIconDiv>
                        Edit
                      </DropDownItemText>
                    </DropDownItem>
                      
                    <DropDownItem>
                      <DropDownItemText onClick={deletePost}>
                        <DropDownItemIconDiv>
                          <AiFillDelete />
                        </DropDownItemIconDiv>
                        Delete
                      </DropDownItemText>
                    </DropDownItem>
                  </>
                )}
              </div>
            </DropDown>
          )}
        </DropDownDiv>
      </>
   );
}
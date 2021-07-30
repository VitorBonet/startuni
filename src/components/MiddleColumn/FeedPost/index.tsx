import { formatDistance } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';
import { useApplicationCisum } from '../../../contexts/ApplicationCisumContext';

import { AiOutlineUser, AiOutlineEllipsis } from 'react-icons/ai';

import Panel from '../../Panel';
import LoadingFeedPost from '../../Shimmer/LoadingFeedPost';
import { PostImage } from './PostImage';

import {
  Container,
  Row,
  HeaderLeft,
  HeaderRight,
  Separator,
  Avatar,
  ProfileIconCircle,
  Column,
  LikeIcon,
  LikedIcon,
  LikedText,
  CommentIcon,
  ShareIcon,
  SendIcon,
} from './styles';

import { enums } from '../../../utils/enums';
import { PostTrack } from './PostTrack';
import { PostLyric } from './PostLyric';
import { PostEvent } from './PostEvent';
import { api } from '../../../services/apiClient';
import { DropdownMore } from './DropdownMore';

interface IImage {
  id: string;
  name: string;
  imageUrl: string;
}

interface ITrack {
  id: string;
  title: string;
  description: string;
  trackUrl: string;
  timeLength: string;
  trackImageUrl?: string;
  trackType: 'v' | 'a';
}

interface ILyric {
  id: string;
  name: string;
  lyrics: string;
}

interface IEvent {
  id: string;
  name: string;
  date: string;
  address: string;
  description: string;
  imageUrl: string;
}
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
  track?: ITrack;
  imageId?: string;
  image?: IImage;
  eventId?: string;
  event?: IEvent;
  lyricId?: string;
  lyric?: ILyric;
  type: 't' | 'i' | 'e' | 'l';
  like: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IFeedPostProps {
  post: IPost;
}

export function FeedPost({ post }: IFeedPostProps) {
  const { isLoading } = useApplicationCisum();
  const [isLike, setIsLike] = useState(post.like);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  function openDropdownMenu() {
    setDropdownMenuOpen(true);
    document.addEventListener('mousedown', closeDropdownMenu);
  }

  function closeDropdownMenu(event) {
    if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
      setDropdownMenuOpen(false);
      document.removeEventListener('mousedown', closeDropdownMenu);
    }
  }

  const toggleLike = useCallback(async () => {
    if (isLike) {
      api.delete(`/posts/likes/${post.id}`);
    } else {
      api.post(`/posts/likes/${post.id}`);
    }

    setIsLike(!isLike);
  }, [isLike, post]);
  
  return (
    <>
      {isLoading ? (
        <LoadingFeedPost />
      ) : (
        <Panel>
        <Container>
          <Row className="heading">
            <HeaderLeft>
              { post.user?.avatarUrl ? ( 
                <Avatar src={post.user?.avatarUrl} alt={post.user?.profileName ? post.user.profileName : post.user.name} />
                ) : (
                <ProfileIconCircle>
                  <AiOutlineUser />
                </ProfileIconCircle>
              ) }
              
              <Column>
                <h3>{post.user?.profileName ? post.user.profileName : post.user.name}</h3>
                <time>{formatDistance(new Date(), new Date(post.updatedAt))}</time>
              </Column>
            </HeaderLeft>
            <HeaderRight>
              <AiOutlineEllipsis size={30} onClick={openDropdownMenu} />
              <DropdownMore refDropdown={dropdownMenuRef} dropdownOpen={dropdownMenuOpen} openDropdown={openDropdownMenu} post={post}/>
            </HeaderRight>
          </Row>

          { post.type === enums.posts.type.image && (
            <PostImage
              image={post.image}
            />
          )}

          { post.type === enums.posts.type.track && (
            <PostTrack
              track={post.track}
            />
          )}

          { post.type === enums.posts.type.lyric && (
            <PostLyric
              lyric={post.lyric}
            />
          )}

          { post.type === enums.posts.type.event && (
            <PostEvent
              event={post.event}
            />
          )}

          <Row className="likes">
            <span className="circle blue" />
            <span className="circle green" />
            <span className="circle red" />
            <span className="number">49</span>
          </Row>

          <Row>
            <Separator />
          </Row>

          <Row className="actions">
            <button onClick={() => toggleLike()}>
              { isLike ? (
                <>
                  <LikedIcon />
                  <LikedText>Like</LikedText>
                </>
              ) : (
                <>
                  <LikeIcon />
                  <span>Like</span>
                </>
              )}
            </button>
            <button>
              <CommentIcon />
              <span>Comment</span>
            </button>
            <button>
              <ShareIcon />
              <span>Share</span>
            </button>
            <button>
              <SendIcon />
              <span>Send</span>
            </button>
          </Row>
        </Container>
        </Panel>
      )}
    </>
  );
};

export default FeedPost;

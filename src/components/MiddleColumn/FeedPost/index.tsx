import { formatDistance } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';
import { useApplicationStartUni } from '../../../contexts/ApplicationStartUniContext';

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
interface IPost {
  id: string;
  userId: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
  };
  imageId?: string;
  image?: IImage;
  type: 't' | 'i' | 'e' | 'l';
  like: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IFeedPostProps {
  post: IPost;
}

export function FeedPost({ post }: IFeedPostProps) {
  const { isLoading } = useApplicationStartUni();
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
                <Avatar src={post.user?.avatarUrl} alt={post.user.name} />
                ) : (
                <ProfileIconCircle>
                  <AiOutlineUser />
                </ProfileIconCircle>
              ) }
              
              <Column>
                <h3>{post.user.name}</h3>
                <time>{formatDistance(new Date(), new Date(post.updatedAt))}</time>
              </Column>
            </HeaderLeft>
            <HeaderRight>
              <AiOutlineEllipsis size={30} onClick={openDropdownMenu} />
              {/* <DropdownMore refDropdown={dropdownMenuRef} dropdownOpen={dropdownMenuOpen} openDropdown={openDropdownMenu} post={post}/> */}
            </HeaderRight>
          </Row>

          <PostImage
            image={post.image}
          />

          <Row className="likes">
            <span className="circle green" />
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

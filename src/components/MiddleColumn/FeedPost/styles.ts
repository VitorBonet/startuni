import styled, { css } from 'styled-components';
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt, AiOutlineSend } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import {
  RiMessage2Line,
  RiShareForwardLine,
  RiSendPlaneLine,
} from 'react-icons/ri';

export const Container = styled.div`
  margin-top: 8px;

  @media (min-width: 870px) {
    margin-top: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  margin: 0 16px;
  display: flex;
  justify-content: space-between;

  &.heading {
    padding: 0px 0 16px;

    h3 {
      font-size: 14px;
      color: var(--gray-700);
    }
    h4,
    time {
      font-size: 12px;
      font-weight: normal;
      color: var(--gray-300);
    }
  }
  &.likes {
    padding: 8px 0;
    font-size: 12px;
    color: var(--gray-700);
    display: flex;
    justify-content: flex-start;

    .circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.green {
        background: var(--green-700);
      }

      & + .circle {
        margin-left: 4px;
      }
    }
    .number {
      margin-left: 8px;
    }
  }
  &.actions {
    justify-content: space-between;

    @media (min-width: 870px) {
      justify-content: flex-start;
    }

    button {
      background: none;
      border: none;
      outline: none;
      color: var(--gray-700);
      font-size: 14px;
      font-weight: 600;

      display: flex;
      align-items: center;
      padding: 14px 8px;

      cursor: pointer;

      transform: filter 0.2s;

      &:hover,
      &:focus {
        filter: brightness(0.7)
      }

      span {
        display: none;

        @media (min-width: 870px) {
          display: unset;
        }
      }
    }
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
`;
export const HeaderRight = styled.div`
  color: var(--gray-700);
  cursor: pointer;
  transform: filter 0.2s;

  &:hover,
  &:focus {
    svg {
      background: var(--gray-100);
      border-radius: 50%;
    }
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid var(--gray-100);
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;

export const ProfileIconCircle = styled.div`
  cursor: pointer;  

  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--gray-100);
  background-color: var(--gray-800);
  border-radius: 50%;
  margin-right: 8px;
`;

export const Column = styled.div``;

const iconCSS = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const LikeIcon = styled(AiOutlineLike)`
  ${iconCSS}
`;

export const LikedIcon = styled(AiFillLike)`
  ${iconCSS}
  color: var(--red-700);
`;

export const LikedText = styled.span`
  color: var(--red-700);
`;

export const CommentIcon = styled(FaRegCommentDots)`
  ${iconCSS}
`;

export const ShareIcon = styled(AiOutlineShareAlt)`
  ${iconCSS}
`;

export const SendIcon = styled(AiOutlineSend)`
  ${iconCSS}
`;

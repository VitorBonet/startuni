import styled, { css } from 'styled-components';
import { BsPencilSquare, BsMusicNoteBeamed, BsFillCalendarFill } from 'react-icons/bs';
import {
  AiFillPlusCircle,
  AiOutlineProfile,
} from 'react-icons/ai';

export const Container = styled.div`
  color: var(--gray-100);

  .write {
    display: flex;
    align-items: center;
    padding: 18px 24px;

    > span {
      margin-left: 8px;
      font-weight: 600;
    }
  }
  .attachment {
    display: none;

    @media (min-width: 870px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 24px;
      border-top: 1px solid var(--color-separator);

      button {
        display: flex;
        padding: 16px;
        height: 100%;
        align-items: center;
        background: none;
        border: none;
        color: var(--gray-100);
        font-weight: 600;

        cursor: pointer;
        &:hover,
        &:focus {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
`;

export const WriteIcon = styled(BsPencilSquare)`
  width: 20px;
  height: 20px;
`;

const iconCSS = css`
  width: 1.175rem;
  height: 1.175rem;
  margin-right: 4px;
`;

export const MusicIcon = styled(BsMusicNoteBeamed)`
  ${iconCSS}
  color: var(--red-500);
`;

export const PlusIcon = styled(AiFillPlusCircle)`
  ${iconCSS}
  color: var(--red-500);
`;

export const CalendarIcon = styled(BsFillCalendarFill)`
  ${iconCSS}
  color: var(--red-500);
`;

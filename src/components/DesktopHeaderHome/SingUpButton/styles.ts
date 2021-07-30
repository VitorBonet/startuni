import styled, { css } from 'styled-components';
import { GrLinkedin } from 'react-icons/gr';
import { AiFillHome, AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';

export const Container = styled.button`
  height: 2.2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--gray-100);
  padding: 0 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--gray-100);
  font-weight: bold;
  transition: filter 0.2s;

  cursor: pointer;

  p {
    padding-bottom: 1px;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg:first-child {
    margin-right: 1rem;
  }

  svg.closeIcon {
    margin-left: 1rem;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
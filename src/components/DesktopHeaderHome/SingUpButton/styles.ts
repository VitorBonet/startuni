import styled, { css } from 'styled-components';
import { GrLinkedin } from 'react-icons/gr';
import { AiFillHome, AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';

export const Container = styled.button`
  height: 2.2rem;
  border-radius: 0.5rem;
  padding: 0 0.5rem;

  border: 1px solid var(--green-700);
  color: var(--green-700);
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

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
  color: var(--white-100);
  background: var(--green-700);
  }
`;
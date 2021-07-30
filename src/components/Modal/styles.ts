import styled, { css } from 'styled-components';

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const ModalHeaderTitle = styled.h3`
  color: var(--gray-100);
`;

export const ModalHeaderClose = styled.div`
  transition: 0.2s;
  color: var(--gray-100);

  cursor: pointer;

  &:hover { 
      filter: brightness(0.8);
    } 
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--gray-950);
    border-radius: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
`;

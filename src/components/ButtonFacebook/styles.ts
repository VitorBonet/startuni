import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: #3b5997;
  height: 35px;
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: var(--gray-100);
  width: 100%;
  font-weight: 500;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    margin-right: 5px;
  }
`;
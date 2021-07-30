import styled from 'styled-components';

export const Container = styled.button`
    background: var(--red-700);
    height: 35px;
    border-radius: 5px;
    border: 0;
    padding: 0 16px;
    color: var(--gray-100);
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
`;
import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--green-700);
    color: var(--white-100);
    height: 35px;
    border-radius: 5px;
    border: 1px solid var(--green-700);
    padding: 0 16px;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: 0.2s;

    gap: 4px;

    &:hover {
      background: transparent;
      color: var(--green-700);
    }
`;
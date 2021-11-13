import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px 12px;

  h1 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--purple-600);
  }

  h2 {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: var(--gray-300);
  }

  .key-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin: 8px;
    padding: 4px;
    font-weight: 600;

    border-bottom: 1px solid var(--gray-100);

    .key {
      color: var(--gray-700);
    }
    .value {
      color: var(--purple-750);
    }
  }
`;

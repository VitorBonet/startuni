import styled from 'styled-components';

export default styled.div`
  margin-bottom: 1rem;
  border: 1px solid var(--gray-100);
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--white-100);

  &.no-shadow {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 2px 3px rgba(0, 0, 0, 0.05);
  }
`;

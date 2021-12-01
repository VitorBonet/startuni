import styled from 'styled-components';

export const Container = styled.div`
  @media (min-width: 500px) {
    /* width: 1000px; */    
    width: 100%;
    
    &.feed {
      max-width: 500px;
      margin: 0 40px;
    }
  }

  @media (max-width: 500px) {
    padding: 0 30px;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 345px;

  > div + div {
    margin-top: 8px;
  }
`;

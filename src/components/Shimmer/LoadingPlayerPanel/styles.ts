import styled from 'styled-components';

export const Container = styled.div`
  > div {
    span {
      display: flex;
      align-items: center;
      padding-bottom: 60px;
      gap: 1rem;
      justify-content: center;

      .row-skeleton {
        height: 12px;
        width: 2rem;
        margin-top: 1rem;

        /* &:nth-child(2) {
          width: 60%;
        }

        &:nth-child(3) {
          width: 50%;
          margin-top: 10px;
        } */
      }
    }
  }
`;

export const PlayerVideo = styled.div`
  padding: 2rem;
  
  .bg-skeleton {
    width: 100%;
    height: 12rem;
    border-radius: 0.5rem;
    filter: brightness(96%);
  }
`;

export const PlayerLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .row-skeleton {
    height: 12px;
    width: 18rem;
  }
`;

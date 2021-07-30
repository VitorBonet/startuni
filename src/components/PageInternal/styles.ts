import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  > span {
    margin-top: 48px;
    display: flex;
  }

  @media (min-width: 870px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0px 30px;

    > span {
      margin-top: 52;
      padding: 8px 0;
    }
  }

  .left-column,
  .right-column,
  .ad-banner {
    display: none;
  }

  @media (min-width: 870px) {
    .left-column,
    .right-column,
    .ad-banner {
      display: unset;
    }

    .middle-column {
      margin: 0 25px 16px;
    }
  }
`;

export const MainPage = styled.div`
  display: flex;
  justify-content: center;
`;

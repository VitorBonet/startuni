import { url } from 'node:inspector';
import styled from 'styled-components';

export const Body = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 59px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  max-width: var(--scaffold-layout-xl-max-width);
  width: 100%;
  gap: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const Title = styled.div`

`;

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &.column {
    flex-direction: column;
  }
`;

export const ItemMessageNot = styled.p`
  color: var(--gray-300);
`;

export const ItemMessageNotDiv = styled.p`
  display: flex;
  flex-direction: column;
`;

export const Data = styled.div`
  display: flex;
  gap: 8px;

  &.column {
    flex-direction: column;
  }
`;

export const DataTitle = styled.p`
  color: var(--gray-700);
`;

export const DataText = styled.p`
  color: var(--gray-300);
`;
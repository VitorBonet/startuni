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
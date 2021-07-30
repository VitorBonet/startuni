import styled, { css } from 'styled-components';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export const Container = styled.div`
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 0 2rem;
  }
`;

export const LeftButton = styled(MdNavigateBefore)`  
  font-size: 3rem;
  position: absolute;
  width: 3rem;
  margin-top: 6rem;
  z-index: 1;
  color: rebeccapurple;
`;

export const RightButton = styled(MdNavigateNext)`    
  font-size: 3rem;
  position: absolute;
  width: 3rem;
  right: 0;
  margin-top: 6rem;
  z-index: 1;
  color: rebeccapurple;
`;

export const ListArea = styled.div`
  overflow-x: hidden;
`;

export const List = styled.div`
  width: 300rem;
`;

export const Item = styled.div`
  display: inline-block;
  width: 15rem;
  height: 15rem;
  transition: all ease 0.2s;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    transform: scale(0.9);

    &:hover {
      transform: scale(1);
    }
  }
`;

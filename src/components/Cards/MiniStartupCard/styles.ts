import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  border: .5px solid var(--gray-100);
  min-height: unset;
  padding: 16px 24px;
  border: 1px solid var(--gray-100);
  box-shadow: 0 4px 8px rgb(29 35 39 / 8%), 0 0 2px rgb(29 35 39 / 6%), 0 0 1px rgb(29 35 39 / 4%);
  border-radius: 16px;
  transition: all .2s linear;
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 20px rgb(29 35 39 / 8%), 0 2px 6px rgb(29 35 39 / 4%), 0 0 1px rgb(29 35 39 / 4%);
    border: .5px solid var(--purple-100);
  }
`;

export const TitleDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Icon = styled.div`
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const Title = styled.div`
  h6 {
    color: var(--gray-300);
  }
`;

export const Descriptiion = styled.div`
  margin: 8px 0;
`;

export const Valuation = styled.div`
  display: flex;
  align-items: center;
`;

export const TextInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 8px 0 0 0;
  color: var(--gray-300);
`;

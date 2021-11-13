import styled from 'styled-components';

export const Container = styled.div`
`;

export const ContainerRight = styled.div`
  margin: 10px;
`;

export const ContainerRightTitle = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerRightContent = styled.div`
  margin-top: 12px;
`;

export const InvestmentInfos = styled.div`
  margin-top: 16px;
`;

export const InvestmentInfo = styled.div`
  border-bottom: 1px solid var(--gray-300);
  display: flex;
  align-items: center;
  padding: 6px 4px;

  h5 {
    width: 85px;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ContainerHeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerNeedMatch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-radius: 5px;
  background: #fff3cd;
  padding: 26px;
`;

export const ContainerNeedMatchIcon = styled.div`
`;

export const ContainerNeedMatchText = styled.div`
  a {
    color: var(--purple-500);
  }

  svg {
    color: #ffcf38;
  }
`;
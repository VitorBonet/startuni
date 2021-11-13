import styled from 'styled-components';

export const Body = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 59px;
  padding-top: 100px;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 50px 50px 50px;
`;

export const ContainerPrimary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerPrimaryLeft = styled.div`
  width: 80%;
`;

export const ContainerPrimaryRight = styled.div`
  /* div {
    &:nth-child(1) {
      position: sticky;
      top: 64px;
    }
  } */
`;

export const Container = styled.div`
  margin-left: 56px;
  margin-right: 56px;

  &.primary {
    margin-right: 16px;
  }

  &.leftMargin {
    margin-left: 112px;
    margin-bottom: 36px;
  }

  &.space {
    margin-top: 56px;
  }

  &.inverted {
    /* background: var(--purple-900); */
    color: var(--purple-900);
    background: linear-gradient(90deg,var(--pink-50) 0%,var(--purple-50) 120%);
    padding: 36px 0;
  }
`;

export const ContainerRight = styled.div`
  margin: 10px;
`;

interface IBackgroundImageProps {
  imageUrl: string;
}

export const BackgroundImage = styled.div<IBackgroundImageProps>`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: cover;
  
  width: 100%;
  height: 250px;
  
  display: flex;
  align-items: flex-end;
`;

export const Logo = styled.div`
  margin: 0 0 -62px 56px;

  img {    
    object-fit: cover; 

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;
    width: 130px;
    height: 130px;
    border-radius: 5px;
    border: none;
  }
`;

export const StartupInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StartupInfo = styled.div`
  margin: 62px 0 0 56px;
`;

export const StartupInfoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StartupInfoMoney = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StartupInfoMoneyValuation = styled.h1`
  color: var(--purple-900);
`;

export const StartupInfoMoneyValuationAlter = styled.div`
  color: var(--white-100);

  p {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 2px;
    font-size: 0.635rem;
    background: var(--green-700);
  }
`;

export const StartupInfoButtons = styled.div`
  display: flex;
  gap: 12px;
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

export const ContainerNeedMatchText = styled.div`
  a {
    color: var(--purple-500);
  }

  svg {
    color: #ffcf38;
  }
`;

export const ThisIsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ThisIsItem = styled.div`
  max-width: 280px;
`;

export const ContainerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const DashNumberDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 4rem;
  }

  p {}
`;

export const Separator = styled.div`
  height: 2px;
  width: 100px;
  background: var(--gray-300);
  margin: 56px 0;
`;

export const Leaderships = styled.div`
  display: flex;
  justify-content: center;
  gap: 56px;
  flex-wrap: wrap;
`;

export const Leadership = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeadershipImage = styled.div`
  img {    
    object-fit: cover;  
    cursor: pointer;  

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    margin: 20px auto;
    overflow: hidden;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 5px solid var(--gray-300);
    transition: all .25s ease-in-out;

    &:hover {
      border: 5px solid var(--purple-600);
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }

  &:hover {
    color: var(--purple-600);
  }
`;

export const LeadershipImageFunctionIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  line-height: 30px;
  border-radius: 50%;
  background-color: var(--white-100);
  border: 5px solid var(--gray-300);
  margin: -43px auto 30px;
  transition: all .25s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeadershipImageIcon = styled.div`
  cursor: pointer;  

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  margin: 20px auto;
  overflow: hidden;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 5px solid var(--gray-300);
  transition: all .25s ease-in-out;

  &:hover {
    border: 5px solid var(--purple-600);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

export const LeadershipText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h5 {
    font-size: 1.25rem;
  }

  p {
    font-size: .875em;
  }
`;

export const LeadershipTextSocialIcons = styled.div`
  display: flex;
  color: var(--purple-600);
  gap: 12px;
  margin-top: 12px;
  transition: filter 0.2s;

  svg {
    cursor: pointer;

    &:hover {    
      filter: brightness(0.8);
    }
  }
`;

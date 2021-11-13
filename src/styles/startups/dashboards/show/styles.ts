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
  margin: 0 0 -62px 4px;

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
  margin: 62px 0 0 4px;
`;

export const StartupInfoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

export const MenuOptionsDiv = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
`;

export const MenuOption = styled.div`
  cursor: pointer;
  padding: 8px 0;
  font-size: 18px;
  letter-spacing: .5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all .2s linear;
  
  div {
    background-color: var(--gray-300);
    width: 14px;
    height: 2px;
    transition: all .2s linear;
    bottom: 0;
  }
  
  &:hover {
    div {
      background-color: var(--purple-500);
      width: 100%;
    }
  }

  &.active {
    div {
      background-color: var(--purple-500);
      width: 100%;
    }
  }
`;


export const Table = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  border: 1px solid var(--gray-100);
  border-radius: 5px;
  padding: 16px;
`;

export const TableItemUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  
  cursor: pointer;
`;

export const TableItemImage = styled.div`

  .profile-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
      0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));
    object-fit: cover;
  }
`;

export const AvatarIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
    0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white-100);
  color: var(--purple-600);
`;

export const TableItemText = styled.div`
`;

export const TableItemButtons = styled.div`
  display: flex;
  gap: 12px;
`;

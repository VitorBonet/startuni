import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 12px;

  .profile-picture {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
      0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));
    object-fit: cover;

    display: flex;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--purple-600);
  }

  h2 {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: var(--gray-300);
  }
  .separator {
    width: 100%;
    border-bottom: 1px solid var(--gray-100);
    margin: 16px 0 12px;
  }
  .key-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin: 0 12px;
    font-weight: 600;

    .key {
      color: var(--gray-300);
    }
    .value {
      color: var(--purple-700);
    }
  }
`;

export const AvatarIcon = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
    0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));

  display: flex;
  align-items: center;
  justify-content: center;
  margin: -38px auto 12px;
  background-color: var(--white-100);
  color: var(--purple-600);
  position: relative;

  label {
    position: absolute;
    width: 32px;
    height: 32px;
    background: var(--white-100);;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: backgound-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 0.2s;

    input {
      display: none;
    }

    svg {
      width: 15px;
      height: 15px;
      color: var(purple-900);
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 12px;

  .profile-cover {
    object-fit: cover;
    width: 100%;
    height: 54px;
    background: var(--gray-800);
  }
  .profile-picture {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 2px solid var(--color-white);
    box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
      0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));
    object-fit: cover;

    display: flex;
    margin: -38px auto 12px;
  }
  h1 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--gray-100);
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
    border-bottom: 1px solid var(--gray-800);
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
      color: var(--color-gray);
    }
    .value {
      color: var(--color-link);
    }
  }
`;

export const AvatarIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  box-shadow: inset 0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15)),
    0 1.5px 3px 0 var(--black-a15, rgba(0, 0, 0, 0.15));

  display: flex;
  align-items: center;
  justify-content: center;
  margin: -38px auto 12px;
  background-color: var(--gray-800);
  color: var(--gray-100)
`;

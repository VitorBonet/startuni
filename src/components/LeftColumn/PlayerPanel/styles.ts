import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  position: sticky;

  color: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  footer {
    align-self: stretch;

    &.empty {
      opacity: 0.5;
    }
  }
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 15rem;
  border: 1.5 dashed var(--white);
  border-radius: 1rem;
  background: linear-gradient(143.8deg, #323238 0%, rgba(0, 0, 0, 0) 100%);

  padding: 2rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;  

  video {
    width: 100%;
  }
`;

export const Player = styled.div`
  width: 100%;
  border: 1.5 dashed var(--white);
  border-radius: 1rem;
  background: linear-gradient(143.8deg, #323238 0%, rgba(0, 0, 0, 0) 100%);

  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;  

  video {
    width: 100%;
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
  font-size: 0.87rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }

  .slider {
    flex: 1;

    .emptySlider {
      width: 100%;
      height: 4px;
      background: var(--white);
      border-radius: 2px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1.5rem;

  button {
    background: transparent;
    border: 0;
    font-size: 0;
    transition: filter 0.2s;

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }

    &:hover:not(:disabled) {
      filter: brightness(0.7);
    }

    &.isActive {
      filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }

    &.isActive:hover {
      filter: brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }

    &.playButton {
      width: 4rem;
      height: 4rem;  
      border-radius: 1rem;
      background: var(--gray-800);

      &:hover:not(:disabled) {
        filter: brightness(0.95);
      }
    }
  }
`;



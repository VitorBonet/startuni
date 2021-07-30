import styled, { css } from 'styled-components';
import { BsVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  padding: 0px 16px 16px;

  h3 {
    font-size: 14px;
    color: var(--white);
  }

  p {
    font-size: 12px;
    font-weight: normal;
    color: var(--gray-100);
  }
`;

export const Video = styled.video`
  width: 100%;
`;

interface TrackImageProps {
  imageBackground: boolean;
}

export const TrackImage = styled.div<TrackImageProps>`
  height: 30rem;
  background: url('${props => props.imageBackground}') center no-repeat;
  background-size: cover;

  img {
    width: 100%;
  }
`;

export const TrackImageButtonPlay = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: none;
  }

  &:hover {
    button {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: #bd293499;
    }

    img {
      cursor: pointer;
    }
  }
`;

export const PlayDiv = styled.div``;

export const Play = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 0px 16px 0px 13px;

  max-width: 1128px;
  height: 80px;

  @media (max-width: 720px) {
    justify-content: center;
    align-items: center;
  }
`;

export const PlaySlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PlayButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const PlayImg = styled.div``;

export const PlayName = styled.div``;

export const PlayButtons = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
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
      width: 3rem;
      height: 3rem;  
      border-radius: 0.5rem;
      /* background: var(--gray-800); */

      &:hover:not(:disabled) {
        filter: brightness(0.95);
      }
    }
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.87rem;
  width: 100%;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
    color: var(--white);
  }

  .slider {
    flex: 1;
    width: 10rem;

    .emptySlider {
      width: 100%;
      height: 4px;
      background: var(--white);
      border-radius: 2px;
    }
  }
`;

export const VolumeDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  &:hover {
    div {
      display: block;
    }
  }
`;

export const VolumeSlider = styled.div`
  display: none;
  height: 6rem;
  position: absolute;
  margin-top: -7rem;
  background: var(--gray-300);
  padding: 1rem 0.3rem;
  border-radius: 0.3rem;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 16px;
`;

export const VolumeIconUp = styled(BsVolumeUpFill)`
  color: var(--white);
  font-size: 22px;
  margin-top: 5px;
`;

export const VolumeIconDown = styled(BsVolumeDownFill)`
color: var(--white);
  font-size: 22px;
  margin-top: 5px;
`;

export const VolumeIconMute = styled(BsFillVolumeMuteFill)`
color: var(--white);
  font-size: 22px;
  margin-top: 5px;
`;

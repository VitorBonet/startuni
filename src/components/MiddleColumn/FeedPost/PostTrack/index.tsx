import React, { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';

import {
  Container,
  Title,
  Video,
  TrackImage,
  TrackImageButtonPlay,
  PlayDiv,
  Play,
  PlaySlider,
  PlayButtonsDiv,
  Progress,
  PlayButtons,
  VolumeDiv,
  VolumeSlider,
  VolumeIconUp,
  VolumeIconDown,
  VolumeIconMute,
} from './styles';

import { enums } from '../../../../utils/enums';
import { convertDurationToTimeString } from '../../../../utils/convertDurationToTimeString';

interface ITrack {
  id: string;
  title: string;
  description: string;
  trackUrl: string;
  timeLength: string;
  trackImageUrl?: string;
  trackType: 'v' | 'a';
}

interface IPostTrackProps {
  track: ITrack;
}

export function PostTrack({ track }: IPostTrackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicList, setMusicList] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  function play(music) {
    setMusicList([music]);
    setCurrentMusicIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentMusicIndex > 0;
  const hasNext = isShuffling || (currentMusicIndex + 1) < musicList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomMusicIndex = Math.floor(Math.random() * musicList.length );

      setCurrentMusicIndex(nextRandomMusicIndex);
    } else if(hasNext) {
      setCurrentMusicIndex(currentMusicIndex + 1);
    }
  }

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }
    

  function handleMusicEnded() {
    if (hasNext) {
      playNext();
    } else {
      // clearPlayerState();
    }
  }

  function handleVolume(amount: number) {
    if(volume > 90 && amount === 0){
      return;
    }

    if(amount < 100){
      audioRef.current.volume = amount / 100;
    } else {
      audioRef.current.volume = 1;
    }
    
    setVolume(amount);
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <Container>
      <Title>
        <h3>{track.title}</h3>
        <p>{track.description}</p>
      </Title>
      { track.trackType === enums.tracks.trackType.video && (
        <Video
          src={track.trackUrl}
          alt={track.title}
          controls
        />
      ) }

      { track.trackType === enums.tracks.trackType.audio && (
        <>
        <TrackImage imageBackground={track.trackImageUrl ?? '/images/default-image.jpg'}>
          <TrackImageButtonPlay>
            <button type="button" onClick={togglePlay}>
              { isPlaying ? (
                <img src="/icons/pause.svg" alt="Pausar" style={{ height: '35px' }}/>
              ) : (
                <img src="/icons/play.svg" alt="Tocar" />
              ) }
            </button>
          </TrackImageButtonPlay>
        </TrackImage>
        <PlayDiv>
          <audio
            src={track.trackUrl}
            ref={audioRef}
            onEnded={handleMusicEnded}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}  
            onPause={() => setPlayingState(false)}  
            onLoadedMetadata={setupProgressListener}
          />
          <Play>
            <PlayButtonsDiv>
              <PlayButtons>
                <button
                  type="button"
                  className="playButton"
                  disabled={!track.trackUrl}
                  onClick={togglePlay}
                  >
                  { isPlaying ? (
                    <img src="/icons/pause.svg" alt="Pausar"/>
                  ) : (
                    <img src="/icons/play.svg" alt="Tocar"/>
                  ) }
                </button>
              </PlayButtons>
            </PlayButtonsDiv>
            <PlaySlider>
              <Progress>
                <span>{convertDurationToTimeString(progress)}</span>
                <div className="slider">
                  { track.trackUrl ? (
                    <Slider 
                      max={Number(track.timeLength)}
                      value={progress}
                      onChange={handleSeek}
                      trackStyle={{ backgroundColor: '#b31d25' }}
                      railStyle={{ backgroundColor: '##FFFF' }}
                      handleStyle={{ borderColor: '#b31d25', borderWidth: 4 }}
                    />
                  ) : (
                    <div className="emptySlider" />
                  )}
                </div>
                <span>{convertDurationToTimeString(Number(track.timeLength) ?? 0)}</span>
              </Progress>
            </PlaySlider>
            
            <VolumeDiv>
              <VolumeSlider>
                <Slider 
                    max={100}
                    value={volume}
                    vertical={true}
                    onChange={handleVolume}
                    trackStyle={{ backgroundColor: '#0d1117' }}
                    railStyle={{ backgroundColor: '##FFFF' }}
                    handleStyle={{ borderColor: '#0d1117', borderWidth: 4 }}
                  />
              </VolumeSlider>
              { volume > 50 && (
                <VolumeIconUp />
              ) }
              
              { volume <= 50 && volume > 0 && (
                <VolumeIconDown />
              ) }

              { volume === 0 && (
                <VolumeIconMute />
              ) }

            </VolumeDiv>
          </Play>
        </PlayDiv>
        </>
      ) }
    </Container>
  );
};

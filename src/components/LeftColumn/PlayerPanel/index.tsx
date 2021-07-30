import React, { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { usePlayer } from '../../../contexts/PlayerContext';

import Panel from '../../Panel';

import { 
  Container, 
  EmptyPlayer,
  Player,
  Progress,
  Buttons,
} from './styles';
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString';

export function PlayerPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const { 
    musicList, 
    currentMusicIndex, 
    isPlaying,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    clearPlayerState,
    hasNext,
    hasPrevious,
    isLooping,
    isShuffling
  } = usePlayer();

  function setupProgressListener() {
    videoRef.current.currentTime = 0;

    videoRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(videoRef.current.currentTime));
    })
  }

  function handleSeek(amount: number) {
    videoRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleMusicEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const music = musicList[currentMusicIndex];

  return (
    <Panel>
      <Container>
        {/* <EmptyPlayer> */}
          {/* <strong>Selecione um podcast para ouvir</strong> */}
          {/* <img src="/images/logo-cisumclub.png" alt="Select a music"/>
        </EmptyPlayer> */}

        <Player>
          <video 
            // src={music.url}
            src="https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4"
            ref={videoRef}
            autoPlay 
            onEnded={handleMusicEnded}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}  
            onPause={() => setPlayingState(false)}  
            onLoadedMetadata={setupProgressListener}
          />
        </Player>

        <footer className="empty">
          <Progress>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className="slider">
              { music ? (
                <Slider 
                  max={music.duration}
                  value={progress}
                  onChange={handleSeek}
                  trackStyle={{ backgroundColor: '#b31d25' }}
                  railStyle={{ backgroundColor: '#323238' }}
                  handleStyle={{ borderColor: '#b31d25', borderWidth: 4 }}
                />
              ) : (
                <div className="emptySlider" />
              )}
            </div>
            <span>{convertDurationToTimeString(music?.duration ?? 0)}</span>
          </Progress>

          <Buttons>
            <button
              type="button"
              // disabled={!music || musicList.length === 1}
              onClick={toggleShuffle}
              className={isShuffling ? "isActive" : ''}
            >
              <img src="/icons/shuffle.svg" alt="Embaralhar"/>
            </button>
            <button type="button" disabled={!music || !hasPrevious} onClick={playPrevious}>
              <img src="/icons/play-previous.svg" alt="Tocar anterior"/>
            </button>
            <button
              type="button"
              className="playButton"
              disabled={!music}
              onClick={togglePlay}
              >
              { isPlaying ? (
                <img src="/icons/pause.svg" alt="Pausar"/>
              ) : (
                <img src="/icons/play.svg" alt="Tocar"/>
              ) }
            </button>
            <button type="button" disabled={!music || !hasNext} onClick={playNext}>
              <img src="/icons/play-next.svg" alt="Tocar próxima"/>
            </button>
            <button
              type="button"
              disabled={!music}
              onClick={toggleLoop}
              className={isLooping ? 'isActive' : ''}
            >
              <img src="/icons/repeat.svg" alt="Repetir"/>
            </button>
          </Buttons>
        </footer>
      </Container>
    </Panel>
  );
};

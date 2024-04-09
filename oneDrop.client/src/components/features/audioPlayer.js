import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../assets/icons/icons';

const AudioPlayer = ({ url, image }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(url);
  const [photo, setImageSrc] = useState(image);
  const segments = useRef([]);

  useEffect(() => {
    setSrc(url);
    setImageSrc(image);
  }, [url, image]);

  useEffect(() => {
    const player = document.querySelector('audio');

    const handleEnd = () => {
      resetPlayer(player);
    };

    const handleTimeUpdate = () => {
      const progress = player.currentTime / player.duration;
      setProgress(progress);
      updateProgressUI(progress);
    };

    player.addEventListener('ended', handleEnd);
    player.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      player.removeEventListener('ended', handleEnd);
      player.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handlePlayerClick = () => {
    const player = document.querySelector('audio');
    if (player.paused) {
      player.play();
      setAudioIsPlaying(true);
    } else {
      player.pause();
      setAudioIsPlaying(false);
    }
  };

  const resetPlayer = (player) => {
    player.currentTime = 0.0;
    setAudioIsPlaying(false);
    setProgress(0);
    updateProgressUI(0);
  };

  const updateProgressUI = (progress) => {
    const [segment1Ref, segment2Ref, segment3Ref, segment4Ref] = segments.current;
  
    if (segment1Ref && segment2Ref && segment3Ref && segment4Ref) {
      if (progress < 0.25 && progress > 0) {
        segment1Ref.style.display = 'block';
        let segmentProgress = -(90 - progress * 360.0);
        segment1Ref.style.transform = 'skew(0deg,' + segmentProgress + 'deg)';
        segment2Ref.style.display = 'none';
        segment3Ref.style.display = 'none';
        segment4Ref.style.display = 'none';
      } else if (progress < 0.5 && progress > 0) {
        segment1Ref.style.transform = 'skew(0deg, 0deg)';
        let segmentProgress = 180 - progress * 360.0;
        segment2Ref.style.transform = 'skew(' + segmentProgress + 'deg, 0deg)';
        segment2Ref.style.display = 'block';
        segment3Ref.style.display = 'none';
        segment4Ref.style.display = 'none';
      } else if (progress < 0.75 && progress > 0) {
        segment2Ref.style.transform = 'skew(0deg, 0deg)';
        let segmentProgress = -(270 - progress * 360.0);
        segment3Ref.style.transform = 'skew(0deg,' + segmentProgress + 'deg)';
        segment3Ref.style.display = 'block';
        segment4Ref.style.display = 'none';
      } else if (progress > 0.75) {
        segment3Ref.style.transform = 'skew(0deg, 0deg)';
        let segmentProgress = 360 - progress * 360.0;
        segment4Ref.style.transform = 'skew(' + segmentProgress + 'deg, 0deg)';
        segment4Ref.style.display = 'block';
      } else if (progress === 0) {
        segment1Ref.style.display = 'none';
        segment2Ref.style.display = 'none';
        segment3Ref.style.display = 'none';
        segment4Ref.style.display = 'none';
      }
    }
  };
  
  

  return (
    <div className="audio-player" onClick={handlePlayerClick}>
      <div className="audio-player-progress-ring">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            ref={(el) => (segments.current[index] = el)}
            key={index}
            className={`audio-player-progress-segment audio-player-progress-segment-${index + 1}`}
            style={{ display: 'none' }}
          ></div>
        ))}
        <div className="audio-player-progress-ring-center" style={{ backgroundImage: `url(${photo})` }}></div>
      </div>
      <div className="audio-player-controls">
        {audioIsPlaying ? <Icon name="pause" size="30px" /> : <Icon name="play" size="30px" />}
      </div>
      <audio>
        <source src={src} type="audio/mpeg" />
        Sadly, your browser doesn't support audio playback :(
      </audio>
      <style jsx>{`
      .audio-player {
        width: 100%;
        height: 100%;
        position: relative;
    }
    
    .audio-player-controls {
        position: absolute;
        width: inherit;
        height: inherit;
        left: 0; 
        top: 0; 
        text-align: center;
        display:grid;
        place-items:center;
    }
    
    .audio-player-progress-ring {
        width: 100%; 
        height: 100%;
        top: 0; 
        left: 0;
        position: absolute;
        border-radius: 50%;
        overflow: hidden;
    }
    
    .audio-player-progress-ring-center {
        width: calc(100% - 6px); 
        height: calc(100% - 6px);
        top: 0; 
        left: 0;
        margin:3px;
        position: absolute;
        border-radius: 50%;
        background-size:contain;
        background-repeat:no-repeat;
    }
    
    .audio-player-progress-segment {
        position: absolute;
        background: var(--txtc);
        width: 100%;
        height: 100%;
    }
    
    .audio-player-progress-segment-1 {
        top: -50%;
        left: 50%;
        transform-origin: top left;
    }
    
    .audio-player-progress-segment-2 {
        top: 50%;
        left: 50%;
        transform-origin: top right;
    }
    
    .audio-player-progress-segment-3 {
        top: 50%;
        left: -50%;
        transform-origin: top right;
    }
    
    .audio-player-progress-segment-4 {
      bottom: 50%;
      right: 50%;
      transform-origin: bottom right;
    }
    
    .audio-player-text {
        font-size: 14pt;
        text-decoration: none;
        color: var(--txtc);
        margin-left: 25px;
    }
    
      
      `}</style>
    </div>
  );
};

export default AudioPlayer;

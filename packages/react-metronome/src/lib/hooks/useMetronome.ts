import { useCallback, useEffect, useRef, useState } from 'react';
import tickSound from '../assets/tick.wav';
import tockSound from '../assets/tock.wav';

const METRONOME_COUNT = {
  MIN: 1,
  MAX: 4,
} as const;

type MetronomeOptions = {
  minBpm?: number;
  maxBpm?: number;
  autoPlay?: boolean;
  onEndCount?: () => void;
  maxBeatCount?: number;
};

const useMetronome = ({
  minBpm = 1,
  maxBpm = 300,
  autoPlay = false,
  onEndCount = () => {},
  maxBeatCount = 4,
}: MetronomeOptions) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const bpmRef = useRef<HTMLInputElement | null>(null);
  const [bpm, setBpm] = useState<number>(60);
  const [count, setCount] = useState<number>(METRONOME_COUNT.MIN);

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const handlePlayMetronomeSound = useCallback(() => {
    const playSound = async (audioUrl: string) => {
      const audio = new Audio(audioUrl);
      try {
        await audio.play();
      } catch (error) {
        console.error(error);
      }
    };

    if (count === METRONOME_COUNT.MIN) {
      playSound(tickSound);
    } else {
      playSound(tockSound);
    }

    setCount((prevCount) => {
      if (prevCount >= maxBeatCount) {
        requestAnimationFrame(() => {
          onEndCount();
        });

        return METRONOME_COUNT.MIN;
      } else {
        return prevCount + 1;
      }
    });
  }, [count, onEndCount, maxBeatCount]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(
      () => {
        handlePlayMetronomeSound();
      },
      (60 / bpm) * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [bpm, isPlaying, handlePlayMetronomeSound]);

  const handleBPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newBpm = parseInt(e.target.value, 10);
    if (newBpm < minBpm) {
      newBpm = minBpm;
    }
    if (newBpm > maxBpm) {
      newBpm = maxBpm;
    }
    setBpm(newBpm);
  };

  const handleBPMInputBlur = () => {
    if (bpmRef.current && (Number.isNaN(bpm) || bpm > maxBpm)) {
      setBpm(maxBpm);
    }
  };

  const handleBPMKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newBpm = parseInt(e.currentTarget.value, 10);
      if (Number.isNaN(newBpm)) {
        setBpm(minBpm);
      }
      e.currentTarget.blur();
    }
  };

  const handleBPMInputFocus = () => {
    if (bpmRef.current && bpmRef.current !== document.activeElement) {
      bpmRef.current.blur();
    }
  };

  useEffect(() => {
    if (bpmRef.current && bpmRef.current !== document.activeElement) {
      bpmRef.current.blur();
    }
  }, [bpmRef]);

  const handleTogglePlaying = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return {
    isPlaying,
    bpm,
    bpmRef,
    handleBPMInputBlur,
    handleBPMKeydown,
    handleBPMInputFocus,
    handleBPMChange,
    handleTogglePlaying,
  };
};

export default useMetronome;

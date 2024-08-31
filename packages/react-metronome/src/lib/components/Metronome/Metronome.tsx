import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import MetronomeContext from '@/lib/context/MetronomeContext';
import useMetronome from '@/lib/hooks/useMetronome';
import PlayButton from '../PlayButton/PlayButton';
import BPMInput from '../BPMInput/BPMInput';

interface MetronomeProps extends PropsWithChildren {
  maxBpm?: number;
  minBpm?: number;
  autoPlay?: boolean;
  onEndCount?: () => void;
  maxBeatCount?: number;
}

function Metronome({
  children,
  minBpm = 1,
  maxBpm = 300,
  autoPlay = false,
  onEndCount = () => {},
  maxBeatCount = 4,
}: MetronomeProps) {
  const metronome = useMetronome({
    minBpm,
    maxBpm,
    autoPlay,
    onEndCount,
    maxBeatCount,
  });

  const contextValue = useMemo(
    () => ({
      ...metronome,
      minBpm,
      maxBpm,
      autoPlay,
      onEndCount,
    }),
    [metronome, minBpm, maxBpm, autoPlay, onEndCount],
  );

  return <MetronomeContext.Provider value={contextValue}>{children}</MetronomeContext.Provider>;
}

export default Metronome;

Metronome.BPMInput = BPMInput;
Metronome.Button = PlayButton;

import { ChangeEventHandler, createContext, KeyboardEventHandler, MutableRefObject } from 'react';

export interface ContextProps {
  isPlaying: boolean;
  bpm: number;
  minBpm: number;
  maxBpm: number;
  bpmRef: MutableRefObject<HTMLInputElement | null>;
  handleTogglePlaying: () => void;
  handleBPMInputBlur: () => void;
  handleBPMChange: ChangeEventHandler<HTMLInputElement>;
  handleBPMKeydown: KeyboardEventHandler<HTMLInputElement>;
  handleBPMInputFocus: () => void;
}

const MetronomeContext = createContext<ContextProps>({
  isPlaying: false,
  bpm: 1,
  minBpm: 1,
  maxBpm: 300,
  bpmRef: { current: null },
  handleBPMInputBlur: () => {},
  handleBPMChange: () => {},
  handleBPMKeydown: () => {},
  handleBPMInputFocus: () => {},
  handleTogglePlaying: () => {},
});

export default MetronomeContext;

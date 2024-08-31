import useMetronomeContext from '@/lib/hooks/useMetronomeContext';

interface MetronomeProps {
  type?: 'number' | 'range';
  className?: string;
}

export default function BPMInput({ type = 'number', className }: MetronomeProps) {
  const {
    bpmRef,
    bpm,
    handleBPMInputBlur,
    handleBPMInputFocus,
    handleBPMKeydown,
    handleBPMChange,
    minBpm,
    maxBpm,
  } = useMetronomeContext();

  return (
    <input
      ref={bpmRef}
      type={type}
      className={className}
      step={1}
      min={minBpm}
      max={maxBpm}
      value={bpm}
      onBlur={handleBPMInputBlur}
      onFocus={handleBPMInputFocus}
      onChange={handleBPMChange}
      onKeyDown={handleBPMKeydown}
    />
  );
}

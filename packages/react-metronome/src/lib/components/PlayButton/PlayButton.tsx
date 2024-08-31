import useMetronomeContext from '@/lib/hooks/useMetronomeContext';

interface PlayButtonProps {
  className?: string;
  buttonContents?: [string, string] | [React.ReactNode, React.ReactNode];
}

function PlayButton({ className = '', buttonContents = ['Play', 'Pause'] }: PlayButtonProps) {
  const { isPlaying, handleTogglePlaying } = useMetronomeContext();

  return (
    <button className={className} onClick={handleTogglePlaying}>
      {isPlaying ? buttonContents[1] : buttonContents[0]}
    </button>
  );
}

export default PlayButton;

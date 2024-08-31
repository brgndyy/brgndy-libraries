import Metronome from './lib/components/Metronome/Metronome';

export default function App() {
  console.log('test console.');
  return (
    <Metronome>
      <Metronome.BPMInput />
      <Metronome.Button />
    </Metronome>
  );
}

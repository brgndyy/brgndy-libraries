# brgndy-react-metronome

React Metronome Library Component

## installing

```
npm install brgndy-react-metronome
```

## Usage

Import components

```javascript
import { Metronome } from 'brgndy-react-metronome';

export default function Component() {
  return (
    <Metronome>
      <Metronome.BPMInput />
      <Metronome.Button />
    </Metronome>
  );
}
```

## Metronome Props

| Name         | Datatype                | Default  | Description                                                                                                                                  |
| ------------ | ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| minBpm       | number or undefined     | 1        | Sets the minimum BPM (Beats Per Minute) for the metronome. The default value is 1.                                                           |
| maxBpm       | number or undefined     | 300      | Sets the maximum BPM for the metronome. The default value is 300.                                                                            |
| autoPlay     | boolean or undefined    | false    | Determines whether the metronome should automatically start playing when the component is mounted. The default value is false.               |
| onEndCount   | () => void or undefined | () => {} | Callback function that is called when the metronome reaches the last beat. The default value is an empty function.                           |
| maxBeatCount | number or undefined     | 4        | Sets the maximum number of beats per measure. For example, setting it to 4 means the metronome operates in 4/4 time. The default value is 4. |

## Explanation

### - minBpm

Defines the minimum BPM that the metronome can be set to. This ensures that the BPM is not set to an excessively low value.

### - maxBpm

Defines the maximum BPM that the metronome can be set to, preventing it from being set too high.

### - autoPlay

When this prop is set to true, the metronome will automatically start playing as soon as the component is rendered, eliminating the need for manual intervention.

### - onEndCount

This callback function is executed when the metronome reaches the maxBeatCount. It allows you to perform specific actions when the metronome finishes a measure.

### - maxBeatCount

Determines the number of beats in each measure. For example, setting it to 4 makes the metronome operate in 4/4 time, while setting it to 3 would mean 3/4 time.

## Metronome Input Component Props

| Name      | Datatype            | Default | Description                                                       |
| --------- | ------------------- | ------- | ----------------------------------------------------------------- |
| type      | number or range     | number  | The style you want to apply BPM style. Can choose number or range |
| className | string or undefined | ""      | className you want to apply that component.                       |

## Metronome Button Component Props

| Name        | Datatype            | Default              | Description                                                                                                                                                |
| ----------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonTexts | [string, string]    | ["재생", "일시정지"] | texts you want to insert. if the metronome is playing, component shows buttonTexts[1]. and if the metronome is not playing, component shows buttonTexts[0] |
| className   | string or undefined | ""                   | className you want to apply that component.                                                                                                                |

## Author

- brgndyy [github](https://github.com/brgndyy)

## License

it's MIT License

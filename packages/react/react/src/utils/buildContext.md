# buildContext

Context를 정의할때 발생하는 보일러플레이트를 줄여주는 함수입니다.

@params 컨텍스트 이름을 정의합니다.

@params 해당 컨텍스트의 초깃값을 담당합니다.

@returns [Provider, useContext]를 반환합니다.

## - 예시

```tsx
import { buildContext } from './buildContext';
import React from 'react';

interface CountContextProps {
  count: number;
  setCount: (newCount: number) => void;
}

const [CountProvider, useCount] = buildContext<CountContextProps>('Count', {
  count: 0,
  setCount: () => {},
});

export default function App() {
  return (
    <CountProvider>
      <Inner />
    </CountProvider>
  );
}

const Inner = () => {
  const { count, setCount } = useCount();

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={incrementCount}>Increment</button>
    </>
  );
};
```

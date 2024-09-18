# useClickDetection

요소의 내부와 외부를 클릭했을때 발생할 콜백 함수를 지정할 수 있는 커스텀 훅입니다.

@params ref로 연결해줄 요소의 타입을 지정합니다.

@params 요소 내부를 클릭했을때 발생 할 콜백 함수입니다.

@params 요소 외부를 클릭했을때 발생 할 콜백 함수입니다.

## - Example

```tsx
import useClickDetection from '../hooks/useClickDetection';

export default function App() {
  const ref = useClickDetection<HTMLDivElement>({
    onInsideClick: () => console.log('inside!'),
    onOutsideClick: () => console.log('outside!'),
  });

  return <div ref={ref}>App</div>;
}
```

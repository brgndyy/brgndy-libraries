# usePreservedCallback

참조하는 함수의 무결성을 유지하면서도 함수 내부에서 사용하는 상태나 값들이 변경될 때 최신 상태를 반영할 수 있도록 하는 훅입니다.

@params 무결성을 보장할 콜백 함수입니다.

## - Example

```tsx
export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = usePreservedCallback(() => {
    console.log(`현재 카운트는: ${count}`);
  });

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>클릭</button>
      <button onClick={() => setCount(count + 1)}>증가 버튼</button>
    </div>
  );
}
```

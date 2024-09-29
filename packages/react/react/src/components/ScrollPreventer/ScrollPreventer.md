# ScrollPreventer

해당 컴포넌트로 감싼 컴포넌트가 렌더링시에 스크롤이 적용되지 않습니다.

백드롭이 적용 된 모달 렌더링시에 사용할때 유용하게 적용됩니다.

## - Example

```tsx
import ScrollPreventer from '/@brgndy-react/ScrollPreventer';

export default function App() {
  return (
    <ScrollPreventer>
      <Modal />
    </ScrollPreventer>
  );
}
```

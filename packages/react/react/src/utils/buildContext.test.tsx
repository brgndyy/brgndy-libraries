import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import { buildContext } from './buildContext';

describe('buildContext에 관한 테스트 코드를 작성한다.', () => {
  interface TestContextType {
    count: number;
    increment: () => void;
    updateContext: (updates: Partial<TestContextType>) => void;
  }

  const defaultContext: TestContextType = {
    count: 0,
    increment: () => {},
    updateContext: () => {},
  };

  const [TestProvider, useTestContext] = buildContext<TestContextType>('Test', defaultContext);

  it('기본 값으로 콘텍스트를 생성해야한다.', () => {
    const { result } = renderHook(() => useTestContext(), {
      wrapper: TestProvider,
    });

    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.updateContext).toBe('function');
  });

  it('컨텍스트의 값을 정상적으로 업데이트 해야한다.', () => {
    const TestComponent = () => {
      const { count, updateContext } = useTestContext();
      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => updateContext({ count: count + 1 })}>Increment</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <TestProvider>
        <TestComponent />
      </TestProvider>,
    );

    expect(getByTestId('count').textContent).toBe('0');

    fireEvent.click(getByText('Increment'));

    expect(getByTestId('count').textContent).toBe('1');
  });

  it('Provider 외부에서 컨텍스트를 사용하면 에러를 발생시켜야 한다.', () => {
    expect(() => {
      renderHook(() => useTestContext());
    }).toThrow('useTest must be used within a TestProvider');
  });

  it('Provider로 감싸진 컴포넌트는 해당 컨텍스트의 값을 정상적으로 가져올 수 있어야한다.', () => {
    const TestComponent = () => {
      const { count } = useTestContext();
      return <span data-testid="count">{count}</span>;
    };

    const { getByTestId } = render(
      <TestProvider value={{ count: 10 }}>
        <TestComponent />
      </TestProvider>,
    );

    expect(getByTestId('count').textContent).toBe('10');
  });
});

import { renderHook, act } from '@testing-library/react';
import usePreservedCallback from './usePreservedCallback';
import { useState } from 'react';
import { vi } from 'vitest';

describe('usePreservedCallback에 대한 테스트 코드 작성', () => {
  it('만약 참조가 동일해도 가장 최근의 콜백 함수를 반환해야한다.', () => {
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (...args: any[]) => any }) => usePreservedCallback(callback),
      {
        initialProps: {
          callback: () => 'initial',
        },
      },
    );

    expect(result.current()).toBe('initial');

    rerender({ callback: () => 'updated' });

    expect(result.current()).toBe('updated');
  });

  it('렌더링 후에도 같은 참조를 유지하고 있어야한다.', () => {
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (...args: any[]) => any }) => usePreservedCallback(callback),
      {
        initialProps: {
          callback: vi.fn(),
        },
      },
    );

    const firstCallbackRef = result.current;

    rerender({ callback: vi.fn() });

    expect(result.current).toBe(firstCallbackRef);
  });

  it('컴포넌트에서 상태 값의 변화가 일어나면 그에 맞게 값이 올바르게 업데이트 되어야한다.', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);

      const preservedCallback = usePreservedCallback(() => count);

      return { preservedCallback, setCount };
    });

    expect(result.current.preservedCallback()).toBe(0);

    act(() => {
      result.current.setCount(10);
    });

    expect(result.current.preservedCallback()).toBe(10);
  });

  it('콜백이 인자를 올바르게 처리해야 한다', () => {
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (value: number) => string }) => usePreservedCallback(callback),
      {
        initialProps: {
          callback: (value: number) => `initial ${value}`,
        },
      },
    );

    expect(result.current(1)).toBe('initial 1');

    rerender({ callback: (value: number) => `updated ${value}` });

    expect(result.current(2)).toBe('updated 2');
  });

  it('상태와 인자를 함께 처리해야 한다', () => {
    const { result } = renderHook(() => {
      const [prefix, setPrefix] = useState('initial');

      const preservedCallback = usePreservedCallback((value: number) => `${prefix} ${value}`);

      return { preservedCallback, setPrefix };
    });

    expect(result.current.preservedCallback(1)).toBe('initial 1');

    act(() => {
      result.current.setPrefix('updated');
    });

    expect(result.current.preservedCallback(2)).toBe('updated 2');
  });
});

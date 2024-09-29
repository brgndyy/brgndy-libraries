import { describe, it, expect, vi } from 'vitest';
import { batchRequestsOf } from './batchOfRequestOf';

describe('batchRequestsOf에 대한 테스트 코드 작성', () => {
  it('동일한 인자를 넣었을때 동일한 프로미스가 반환되어야 한다.', async () => {
    const mockFunc = vi.fn((a: number, b: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(a + b), 100);
      });
    });

    const batchedFunc = batchRequestsOf(mockFunc);

    const promise1 = batchedFunc(1, 2);
    const promise2 = batchedFunc(1, 2);

    expect(promise1).toBe(promise2);
    expect(mockFunc).toHaveBeenCalledTimes(1);

    const result = await promise1;
    expect(result).toBe(3);
  });

  it('다른 인자를 넣었을때는 다른 프로미스가 반환 되어야 한다.', async () => {
    const mockFunc = vi.fn((a: number, b: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(a + b), 100);
      });
    });

    const batchedFunc = batchRequestsOf(mockFunc);

    const promise1 = batchedFunc(1, 2);
    const promise2 = batchedFunc(3, 4);

    expect(promise1).not.toBe(promise2);
    expect(mockFunc).toHaveBeenCalledTimes(2);

    const result1 = await promise1;
    const result2 = await promise2;

    expect(result1).toBe(3);
    expect(result2).toBe(7);
  });

  it('프로미스가 resolve 된 후에는 새로운 프로미스가 반환 되어야 한다.', async () => {
    const mockFunc = vi.fn((a: number, b: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(a + b), 100);
      });
    });

    const batchedFunc = batchRequestsOf(mockFunc);

    const promise1 = batchedFunc(1, 2);
    await promise1;

    const promise2 = batchedFunc(1, 2);
    expect(promise1).not.toBe(promise2);
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });
});

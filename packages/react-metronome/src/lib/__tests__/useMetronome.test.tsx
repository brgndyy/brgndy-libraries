import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useMetronome from '../hooks/useMetronome';
import tickSound from '../assets/tick.wav';
import tockSound from '../assets/tock.wav';

global.Audio = vi.fn().mockImplementation((audioUrl) => {
  return {
    play: vi.fn().mockResolvedValue(undefined),
    src: audioUrl,
    currentTime: 0,
  };
}) as unknown as jest.Mock;

describe('useMetronome Hook에 대한 테스트 코드 작성', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    global.requestAnimationFrame = vi.fn().mockImplementation((cb) => cb());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('기본값으로 지정한대로 값이 정상적으로 초기화 된다.', () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.bpm).toBe(60);
    expect(result.current.bpmRef.current).toBe(null);
  });

  it('BPM 변경이 정상적으로 이루어진다.', () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    act(() => {
      result.current.handleBPMChange({
        target: { value: '120' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.bpm).toBe(120);
  });

  it('BPM이 최대값을 벗어나거나 최소값을 벗어나면 지정한 최소or 최대 값으로 초기화 된다.', () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    act(() => {
      result.current.handleBPMChange({
        target: { value: '400' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.bpm).toBe(300);

    act(() => {
      result.current.handleBPMChange({
        target: { value: '-10' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.bpm).toBe(1);
  });

  it('버튼을 누르면 재생과 일시정지 버튼이 번갈아서 렌더링 된다.', async () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    expect(result.current.isPlaying).toBe(false);

    await act(async () => {
      result.current.handleTogglePlaying();
    });

    expect(result.current.isPlaying).toBe(true);

    await act(async () => {
      result.current.handleTogglePlaying();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  it('초기에는 tickSound 소리를 호출한다.', async () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    act(() => {
      result.current.handleTogglePlaying();
    });

    await act(async () => {
      vi.advanceTimersByTime((60 / result.current.bpm) * 1000);
    });

    expect(global.Audio).toHaveBeenCalledWith(tickSound);
  });

  it('첫번째 박자 이후에는 tockSound를 호출한다.', async () => {
    const { result } = renderHook(() => useMetronome({ minBpm: 1, maxBpm: 300 }));

    act(() => {
      result.current.handleTogglePlaying();
    });

    await act(async () => {
      vi.advanceTimersByTime((60 / result.current.bpm) * 1000);
    });

    await act(async () => {
      vi.advanceTimersByTime((60 / result.current.bpm) * 1000);
    });

    expect(global.Audio).toHaveBeenCalledWith(tockSound);
  });

  it('maxBeatCount이 true로 되면 onEndCount 함수가 실행 된다.', async () => {
    const onEndCountMock = vi.fn();
    const { result } = renderHook(() =>
      useMetronome({ maxBeatCount: 2, onEndCount: onEndCountMock }),
    );

    act(() => {
      result.current.handleTogglePlaying();
    });

    await act(async () => {
      vi.advanceTimersByTime((60 / result.current.bpm) * 1000);
    });

    await act(async () => {
      vi.advanceTimersByTime((60 / result.current.bpm) * 1000); // 두 번째 박자
    });

    expect(onEndCountMock).toHaveBeenCalledTimes(1);
  });
});

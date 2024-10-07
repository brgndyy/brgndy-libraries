import { useRef } from 'react';

const useSingleRequest = () => {
  const apiRequests = useRef<Set<string>>(new Set());

  const startRequest = (requestId: string): boolean => {
    if (apiRequests.current.has(requestId)) {
      console.warn('중복 된 요청입니다!');
      return false;
    }
    apiRequests.current.add(requestId);

    return true;
  };

  return { startRequest };
};

export default useSingleRequest;

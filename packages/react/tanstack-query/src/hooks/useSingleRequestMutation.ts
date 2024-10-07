import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import useSingleRequest from './useSingleRequest';

interface SingleFlightMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  requestId?: string;
}

const useSingleRequestMutation = <TData, TError, TVariables = void>(
  options?: SingleFlightMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> => {
  const { startRequest } = useSingleRequest();
  const requestId = options?.requestId || 'defaultRequestId';

  return useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn: options?.mutationFn,
    onMutate: async (variables: TVariables) => {
      const isCallableRequest = startRequest(requestId);
      if (!isCallableRequest) {
        throw new Error('중복 된 요청이에요!');
      }
      if (options?.onMutate) {
        return await options.onMutate(variables);
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: unknown,
    ) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
};

export default useSingleRequestMutation;

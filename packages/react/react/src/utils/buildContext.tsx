// buildContext.tsx
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type ProviderProps<T> = {
  children: ReactNode;
  value?: Partial<T>;
};

export function buildContext<T>(contextName: string, defaultContext: T) {
  const Context = createContext<(T & { updateContext: (updates: Partial<T>) => void }) | null>(
    null,
  );

  function Provider({ children, value }: ProviderProps<T>) {
    const [state, setState] = useState<T>(() => ({
      ...defaultContext,
      ...value,
    }));

    const updateContext = (updates: Partial<T>) => {
      setState((prevState) => ({
        ...prevState,
        ...updates,
      }));
    };

    const contextValue = useMemo(() => ({ ...state, updateContext }), [state]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  function useContextHook(): T & {
    updateContext: (updates: Partial<T>) => void;
  } {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`use${contextName} must be used within a ${contextName}Provider`);
    }

    return context;
  }

  if (process.env.NODE_ENV !== 'production') {
    Context.displayName = `${contextName}Context`;
  }

  Provider.displayName = `${contextName}Provider`;

  return [Provider, useContextHook] as const;
}

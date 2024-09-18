import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type ProviderProps<T> = {
  children: ReactNode;
  value?: Partial<T>;
};

export function buildContext<T extends object>(contextName: string, defaultContext: T) {
  const Context = createContext<T | null>(null);

  function Provider({ children, value }: ProviderProps<T>) {
    const [state, setState] = useState<T>(() => ({
      ...defaultContext,
      ...value,
    }));

    const contextValue = useMemo(() => {
      const updateContext = (updates: Partial<T>) => {
        setState((prevState) => ({ ...prevState, ...updates }));
      };

      return {
        ...state,
        updateContext,
      };
    }, [state]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  function useContextHook(): T {
    const context = useContext(Context);

    if (context === null || undefined) {
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

import {createContext} from 'react';

export const sessionContext = createContext({
  user: null,
  initializing: true,
});

export const SessionProvider = sessionContext.Provider;

export const SessionConsumer = sessionContext.Consumer;

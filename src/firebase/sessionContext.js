import React, {createContext} from 'react';

export const sessionContext = createContext({
  user: null,
  initializing: true,
  userData: null,
});

export const SessionProvider = sessionContext.Provider;

export const SessionConsumer = sessionContext.Consumer;

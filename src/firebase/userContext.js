import React, {createContext} from 'react';

export const userContext = createContext({
  user: null,
});

export const UserProvider = userContext.Provider;

export const UserConsumer = userContext.Consumer;

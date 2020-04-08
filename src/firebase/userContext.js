import React, {createContext} from 'react';

const userContext = createContext({
  user: null,
});

const UserProvider = userContext.Provider;

const UserConsumer = userContext.Consumer;

export {userContext, UserProvider, UserConsumer};

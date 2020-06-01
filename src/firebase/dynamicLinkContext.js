import {createContext} from 'react';

export const dynamicLinkContext = createContext(undefined);

export const DynamicLinkProvider = dynamicLinkContext.Provider;

export const DynamicLinkConsumer = dynamicLinkContext.Consumer;

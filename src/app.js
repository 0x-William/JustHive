import React from 'react';
import { FeathersWrapper } from 'AppConnectors';
import config from 'AppConfig';
import { globalInjector } from 'AppUtilities';
import Buffer from 'buffer';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from 'ReduxStore';

// import { AsyncStorage } from 'react-native';
// AsyncStorage.clear();

const injectGlobals = globalInjector();

injectGlobals({
  Buffer: [Buffer, false]
});

export const App = () => (
  <FeathersWrapper
    wsEndpoint={config.WSOCKET}
    loader={null /* You can add a component here (eg. {<Loader />} */ }
    timeout={5000}
  >
    <Provider store={store}>
      <Router />
    </Provider>
  </FeathersWrapper>
);

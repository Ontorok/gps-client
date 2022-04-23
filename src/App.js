import '@fake-db';
import AppWrapper from 'components/AppWrapper';
import AppContextProvider from 'components/contextProvider/AppContextProvider';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import configureStore, { history } from './redux/store';
import Routes from './routes';

export const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContextProvider>
        <AppWrapper>
          <Switch>
            <Routes />
          </Switch>
        </AppWrapper>
      </AppContextProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;

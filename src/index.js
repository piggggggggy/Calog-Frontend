import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';

// sentry
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

//history 라우팅
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";

//리덕스
import { Provider } from "react-redux";

// redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configStore';

// sentry 설정
Sentry.init({
  // 환경에 상관없이
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>    
    </ConnectedRouter>
  </Provider>
    ,
  document.getElementById('root')
);

reportWebVitals();

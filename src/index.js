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
// Sentry.init({
//   // 환경에 상관없이
//   dsn: process.env.REACT_APP_SENTRY_DSN,
//   // dsn: "https://642520931c36496a813e99643535804f@o968220.ingest.sentry.io/5919723",
//   // 프로덕션 만
//   // dsn: process.env.NODE_ENV === "production"
//   //   ? "https://642520931c36496a813e99643535804f@o968220.ingest.sentry.io/5919723"
//   //   : false,
//   integrations: [new Integrations.BrowserTracing()],
//   // environment: process.env.NODE_ENV,
//   tracesSampleRate: 1.0,
// });

// return <button onClick={methodDoesNotExist}>Break the world</button>;

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

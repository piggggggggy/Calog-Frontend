import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
//history 라우팅
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
//리덕스
import { Provider } from "react-redux";
// redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configStore';

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

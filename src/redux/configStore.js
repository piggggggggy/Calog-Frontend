import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

// persist
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// => localStorage에 저장!

// reducers
import user from "./modules/user";
import record from './modules/record';
import cart from './modules/cart';
import favorite from './modules/favorite';
import search from './modules/search';

export const history = createBrowserHistory();

const middlewares = [
  thunk.withExtraArgument({
    history,
  }),
];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// persist
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"]
};

const reducer = combineReducers({
  user: user.reducer,
  record: record.reducer,
  cart: cart.reducer,
  favorite: favorite.reducer,
  search: search.reducer,
  router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({ reducer: persistedReducer, middleware: middlewares });

export const persistor = persistStore(store);

export default { store, persistor };
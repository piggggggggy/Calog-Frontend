import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

// redux-persist
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// reducers
import user from "./modules/user";
import record from './modules/record';
import cart from './modules/cart';
import favorite from './modules/favorite';
import search from './modules/search';
import notice from "./modules/notice";
import recent from './modules/recent';
import dashboard from './modules/dashboard';
import food from './modules/food';

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
  key: "auth",
  storage: storageSession,
  whitelist: ["cart", "recent", "record", "dashboard", "food"]
};

const reducer = combineReducers({
  user: user.reducer,
  record: record.reducer,
  cart: cart.reducer,
  favorite: favorite.reducer,
  search: search.reducer,
  recent: recent.reducer,
  notice: notice.reducer,
  dashboard: dashboard.reducer,
  food:food.reducer,
  router: connectRouter(history),
});

// persist
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({ reducer: persistedReducer, middleware: middlewares });
export const persistor = persistStore(store);
export default { store, persistor };
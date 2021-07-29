import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
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

const reducer = combineReducers({
  user: user.reducer,
  record: record.reducer,
  cart: cart.reducer,
  favorite: favorite.reducer,
  search: search.reducer,
  router: connectRouter(history),
});

let store = configureStore({ reducer, middleware: middlewares });

export default store;
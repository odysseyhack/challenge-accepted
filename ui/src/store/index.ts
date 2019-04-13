import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { systemReducer } from "./system/reducers";
import { usersReducer } from "./users/reducers";
import { contractsReducer } from "./contracts/reducers";

const rootReducer = combineReducers({
  system: systemReducer,
  users: usersReducer,
  contracts: contractsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}

import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { appSlice } from "./app/slice";
import thunkMiddleware from "redux-thunk";

export const rootReducer = combineReducers({
  app: appSlice.reducer,
});

// QUESTION: Why would we use thunk middleware? What advantage does this give us?
// ANSWER: Can dispatch multiple actions asyncronously. Helps with more complex things when utilizing Redux and expands our handling capabilities.
const composedEnhancer = applyMiddleware(thunkMiddleware);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [composedEnhancer],
  devTools: true,
});

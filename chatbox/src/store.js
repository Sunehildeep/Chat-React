import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authenticationReducer } from "./reducers/authenticationReducer";

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("myAppStore", serializedState);
  } catch (error) {
    // Handle errors
  }
};

// Load the store state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("myAppStore");
    if (serializedState === null) {
      return undefined; // Return undefined to let Redux initialize the state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Load the persisted state from localStorage
const persistedState = loadStateFromLocalStorage();

// Create the store
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: [thunkMiddleware],
  preloadedState: persistedState, // Set the preloaded state from localStorage
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  const currentState = store.getState();
  saveStateToLocalStorage(currentState);
});

export default store;

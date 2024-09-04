"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import authReducer from "@/state";
import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
   return {
      getItem(_key: any) {
         return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
         return Promise.resolve(value);
      },
      removeItem(_key: any) {
         return Promise.resolve();
      },
   };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  version: 1
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export default function Providers({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    // <Provider store={store}>
      // {/* <PersistGate persistor={persistStore(store)}> */}
        <SessionProvider>
          {children}
        </SessionProvider>
      // {/* </PersistGate> */}
    // </Provider>
  );
}
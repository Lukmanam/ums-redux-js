import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlice/UserSlice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const Persisted = persistReducer(persistConfig, userReducer);

const Store = configureStore({
  reducer: {
    user: Persisted,
  },
});

const persistor = persistStore(Store);

export { Store, persistor };

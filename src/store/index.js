import { createStore } from "redux";
import rootReducer from "./redux/reducers"; // nếu chỉ có 1 reducer thì import counterReducer thay thế
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { persistor };
export default store;

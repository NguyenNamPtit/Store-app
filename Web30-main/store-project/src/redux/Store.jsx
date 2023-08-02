// import { configureStore } from "@reduxjs/toolkit";
// import { cartReducer } from "./CartSlide";

// const Store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default Store;
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./CartSlide";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

//config redux
const persistConfig = {
  key: "cart",
  storage, // local storage
};
// (cart, storage === reducer khi lưu vào local)

// Tạo ra 1 reducer mới trong localStorage với redux persist
const cartpersistReducer = persistReducer(persistConfig, cartReducer);

export const Store = configureStore({
  reducer: cartpersistReducer,
  middleware: [thunk],
});

export let persistor = persistStore(Store);

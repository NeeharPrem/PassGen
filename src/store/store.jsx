import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
});

console.log("Store State:", store.getState());
export default store;
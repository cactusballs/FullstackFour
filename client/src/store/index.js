import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        user: UserReducer
    }
});

export default store;
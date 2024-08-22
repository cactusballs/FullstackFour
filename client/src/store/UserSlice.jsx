import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{  
        user: null,
        error: null
    }
});

export default userSlice.reducer;
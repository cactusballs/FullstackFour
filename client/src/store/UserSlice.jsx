import { CreateSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{  
        user: null
    }
});

export default userSlice.reducer;
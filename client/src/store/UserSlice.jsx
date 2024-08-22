    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

    export const loginUser = createAsyncThunk(
        "user/loginUser",
        async ({ userCredentials, navigate }, {rejectWithValue}) => {
            const {email, password } = userCredentials;

            try {
                const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
                });
        
                const data = await response.json();
        
                if (response.ok) {
                // Save the token (use cookies for better security)
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
                return data;
                } else {
                    return rejectWithValue(data.message);
                }
                } catch (error) {
                return rejectWithValue('An error occurred during login.');
                }
            }
            );

    const userSlice = createSlice({
        name: "user",
        initialState:{  
            user: null,
            error: null
        }
    });

    export default userSlice.reducer;
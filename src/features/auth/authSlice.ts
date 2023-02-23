import axios, { AxiosError } from 'axios'
import { API_BASE_URL_DEV } from '../../utils/constants';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

interface AuthState {
    isAuthenticated: boolean
    isAuthenticating: boolean
    user: User | null
    error: string | null
}

interface LoginCredentials {
    email: string
}

export const emailLogin = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_BASE_URL_DEV + '/auth/login', credentials);
      return response.data;
    } catch (error: AxiosError | any) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message);
        } else {
            return
        }
    }
  }
)

const initialState: AuthState = {
    isAuthenticated: false,
    isAuthenticating: false,
    user: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticating = false;
            state.user = null
            state.error = null
        }
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuth: boolean;
    idToken: string;
    refreshToken: string;
    localId: string;
    email: string;
}

interface AuthPayload {
    idToken: string;
    refreshToken: string;
    localId: string;
    email: string;
}

const ID_TOKEN_KEY = 'id-token-key';
const REFRESH_TOKEN_KEY = 'refresh-token-key';
const EXPIRES_KEY = 'expires-key';
const LOCAL_ID_KEY = 'local-id-key';
const EMAIL_KEY = 'email-key';

function getInitialState(): AuthState {
    const expiresIn = localStorage.getItem(EXPIRES_KEY) ?? null;

    if (expiresIn && new Date() > new Date(expiresIn)) {
        return {
            isAuth: false,
            idToken: '',
            refreshToken: '',
            localId: '',
            email: '',
        };
    }

    return {
        isAuth: Boolean(localStorage.getItem(ID_TOKEN_KEY) ?? ''),
        idToken: localStorage.getItem(ID_TOKEN_KEY) ?? '',
        refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) ?? '',
        localId: localStorage.getItem(LOCAL_ID_KEY) ?? '',
        email: localStorage.getItem(EMAIL_KEY) ?? '',
    };
}

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthPayload>) {
            state.isAuth = Boolean(action.payload.idToken);
            state.idToken = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
            state.localId = action.payload.localId;
            state.email = action.payload.email;

            const tokenExpires = new Date(
                new Date().getTime() + 24 * 60 * 60 * 1000
            );

            localStorage.setItem(ID_TOKEN_KEY, action.payload.idToken);
            localStorage.setItem(
                REFRESH_TOKEN_KEY,
                action.payload.refreshToken
            );
            localStorage.setItem(EXPIRES_KEY, tokenExpires.toString());
            localStorage.setItem(LOCAL_ID_KEY, action.payload.localId);
            localStorage.setItem(EMAIL_KEY, action.payload.email);
        },
        logout(state) {
            state.isAuth = false;
            state.idToken = '';
            state.refreshToken = '';
            state.localId = '';
            state.email = '';

            localStorage.removeItem(ID_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(EXPIRES_KEY);
            localStorage.removeItem(LOCAL_ID_KEY);
            localStorage.removeItem(EMAIL_KEY);
        },
    },
});

export default authSlice.reducer;

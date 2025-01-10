import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAirportCountry, IAirportState } from '../../models/models';

interface HandbookState {
    countries: IAirportCountry[];
    states: IAirportState[];
    loading: boolean;
    error: string;
}

interface HandbookPayload {
    countries: IAirportCountry[];
    states: IAirportState[];
}

const initialState: HandbookState = {
    countries: [],
    states: [],
    loading: false,
    error: '',
};

export const handbookSlice = createSlice({
    name: 'handbook',
    initialState,
    reducers: {
        fetch(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<HandbookPayload>) {
            state.loading = false;
            state.countries = action.payload.countries;
            state.states = action.payload.states;
            state.error = '';
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export default handbookSlice.reducer;

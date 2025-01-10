import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAirport } from '../../models/models';

interface AirportDetailState {
    airport: IAirport | null;
    loading: boolean;
    error: string;
}

const initialState: AirportDetailState = {
    airport: null,
    loading: false,
    error: '',
};

export const airportDetailSlice = createSlice({
    name: 'airportDetail',
    initialState,
    reducers: {
        fetch(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IAirport>) {
            state.loading = false;
            state.airport = action.payload;
            state.error = '';
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export default airportDetailSlice.reducer;

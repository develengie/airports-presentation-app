import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAirport, IFilter } from '../../models/models';

interface AirportState {
    airports: IAirport[];
    airportsContainer: IAirport[];
    loading: boolean;
    error: string;
}

const initialState: AirportState = {
    airports: [],
    airportsContainer: [],
    loading: false,
    error: '',
};

export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        fetch(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IAirport[]>) {
            state.loading = false;
            state.airports = action.payload;
            state.airportsContainer = action.payload;
            state.error = '';
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
        filter(state, action: PayloadAction<IFilter>) {
            state.airports = state.airportsContainer
                .filter(airport =>
                    airport.country.includes(action.payload.country)
                )
                .filter(airport =>
                    airport.state.includes(action.payload.state)
                );
        },
    },
});

export default airportSlice.reducer;

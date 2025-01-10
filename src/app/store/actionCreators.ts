import axios, { axiosAuth } from '../axios';
import {
    IAirport,
    IAuth,
    IAuthLoginResponse,
    IAuthRegisterResponse,
    IComment,
    ServerAirportResponse,
    ServerCommentResponse,
} from '../models/models';
import { AppDispatch, RootState } from './index';
import { NavigateFunction } from 'react-router-dom';
import { airportSlice } from './slices/airportSlice';
import { airportDetailSlice } from './slices/airportDetailSlice';
import { handbookSlice } from './slices/handbookSlice';
import { authSlice } from './slices/authSlice';
import { commentSlice } from './slices/commentSlice';

export const fetchAirports = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(airportSlice.actions.fetch());
            const { data } = await axios.get<ServerAirportResponse>(
                'airports.json'
            );
            dispatch(airportSlice.actions.fetchSuccess(Object.values(data)));
        } catch (e) {
            dispatch(airportSlice.actions.fetchError(e as Error));
        }
    };
};

export const fetchAirport = (airportId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(airportDetailSlice.actions.fetch());
            const { data } = await axios.get<IAirport>(
                `airports/${airportId}.json`
            );
            dispatch(airportDetailSlice.actions.fetchSuccess(data));
        } catch (e) {
            dispatch(airportDetailSlice.actions.fetchError(e as Error));
        }
    };
};

export const fetchHandbooks = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(handbookSlice.actions.fetch());

            const { data } = await axios.get<ServerAirportResponse>(
                'airports.json'
            );

            const countries = Object.values(data).map(
                airport => airport.country
            );
            const uniqueCountries = Array.from(
                new Set(Object.values(countries))
            );

            const states = Object.values(data).map(airport => airport.state);
            const uniqueStates = Array.from(new Set(Object.values(states)));

            dispatch(
                handbookSlice.actions.fetchSuccess({
                    countries: uniqueCountries,
                    states: uniqueStates,
                })
            );
        } catch (e) {
            dispatch(handbookSlice.actions.fetchError(e as Error));
        }
    };
};

export const fetchComments = (airportId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(commentSlice.actions.fetch());
            const { data } = await axios.get<ServerCommentResponse>(
                'comments.json'
            );
            const fetchedComments = Object.values(data).filter(
                comment => comment.airport === airportId
            );
            dispatch(commentSlice.actions.fetchSuccess(fetchedComments));
        } catch (e) {
            dispatch(commentSlice.actions.fetchError(e as Error));
        }
    };
};

export const createComment = (comment: IComment) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const idToken = getState().authReducer.idToken;
            const response = await axios.put(
                `comments/${comment._id}.json`,
                comment,
                {
                    params: {
                        auth: idToken,
                    },
                }
            );
            dispatch(commentSlice.actions.addComment(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const register = (
    userData: IAuth,
    navigate: NavigateFunction,
    toast: any
) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axiosAuth.post<IAuthRegisterResponse>(
                'accounts:signUp',
                {
                    ...userData,
                    returnSecureToken: true,
                }
            );
            dispatch(
                authSlice.actions.loginSuccess({
                    idToken: data.idToken,
                    refreshToken: data.refreshToken,
                    localId: data.localId,
                    email: data.email,
                })
            );
            navigate('/');
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        }
    };
};

export const login = (
    userData: IAuth,
    navigate: NavigateFunction,
    toast: any
) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axiosAuth.post<IAuthLoginResponse>(
                'accounts:signInWithPassword',
                {
                    ...userData,
                    returnSecureToken: true,
                }
            );
            dispatch(
                authSlice.actions.loginSuccess({
                    idToken: data.idToken,
                    refreshToken: data.refreshToken,
                    localId: data.localId,
                    email: data.email,
                })
            );
            navigate('/');
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        }
    };
};

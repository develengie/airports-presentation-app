export interface IAirport {
    _id: string;
    icao: string;
    iata: string;
    name: string;
    city: string;
    state: string;
    country: string;
    elevation: number;
    lat: number;
    lon: number;
    tz: string;
}

export interface ServerAirportResponse {
    [key: string]: {
        _id: string;
        icao: string;
        iata: string;
        name: string;
        city: string;
        state: string;
        country: string;
        elevation: number;
        lat: number;
        lon: number;
        tz: string;
    };
}

export interface ServerCommentResponse {
    [key: string]: {
        _id: number;
        airport: string;
        created_at: string;
        text: string;
        user: string;
    };
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthRegisterResponse {
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
}

export interface IAuthLoginResponse {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
}

export interface IAuthLoginValidationErrors {
    email?: string | undefined;
    password?: string | undefined;
}

export interface IFilter {
    country: IAirportCountry;
    state: IAirportState;
}

export interface IComment {
    _id: number;
    airport: string;
    created_at: string;
    text: string;
    user: string;
}

export type IAirportCountry = string;
export type IAirportState = string;

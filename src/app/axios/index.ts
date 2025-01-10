import axios from 'axios';

export const axiosAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
    },
});

export default axios.create({
    baseURL:
        'https://airports-presentation-app-default-rtdb.europe-west1.firebasedatabase.app/',
});

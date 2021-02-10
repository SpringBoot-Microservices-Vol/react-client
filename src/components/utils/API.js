import axios from "axios";
import cookie from "react-cookies";
import {API_BLOB} from "./API_BLOB";

export const API = axios.create({
    baseURL: getBaseURL()
});

export function getBaseURL() {
    if (process.env.REACT_APP_STAGE !== 'production') {
        console.log("REACT_APP_STAGE:" + process.env.REACT_APP_STAGE);
        return 'http://localhost:8011/';
    }
    return 'https://api-licenta.herokuapp.com/';
}

export const authService = {
    login: (token) => {
        cookie.save('bearer', token);

        API.interceptors.request.use(config => {
            config.headers.Authorization = "Bearer " + token;
            return config
        });

        API_BLOB.interceptors.request.use(config => {
            config.headers.Authorization = "Bearer " + token;
            return config
        })
    },
    logout: () => cookie.remove('bearer'),
    isAuthenticated: () => cookie.load('bearer') !== undefined,
    getToken: () => cookie.load('bearer')
};

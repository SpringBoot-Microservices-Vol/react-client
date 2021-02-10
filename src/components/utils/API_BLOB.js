import axios from "axios";
import {getBaseURL} from "./API";

export const API_BLOB = axios.create({
    baseURL: getBaseURL(),
    responseType: 'blob'
});
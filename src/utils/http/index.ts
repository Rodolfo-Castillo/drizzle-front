import axios from "axios";
import {showNotify} from "../utils";

const HTTP = axios.create({
    baseURL: import.meta.env.VITE_HOST_API,
});

HTTP.interceptors.request.use((request: any) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
});

HTTP.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    if (error.status === 403 || error.status == 401) {
        showNotify({ msg: error.response.data.message, color: 'negative', icon: 'cancel' });
        window.location.href = '/login';
    }
    return error;
});

export const HttpPost = async (url:string, params:{}) => {
    try {
        const res = await HTTP.post(url, params).catch((error: any) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        console.log(error)
        return error.response;
    }
};

export const HttpGet = async (url:string, params:{}) => {
    try {
        const res = await HTTP.get(url, params).catch((error:any) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error:any) {
        return error.response;
    }
};

export const HttpPut = async (url:string, params:{}) => {
    try {
        const res = await HTTP.put(url, params).catch((error:any) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error:any) {
        return error.response;
    }
};

export const HttpDelete = async (url:string, params:{}) => {
    try {
        const res = await HTTP.delete(url, params).catch((error:any) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        return error.response;
    }
};

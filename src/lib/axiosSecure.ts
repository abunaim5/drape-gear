import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const getAxiosSecure = async () => {
    const session = await getSession();
    const token = session?.user.accessToken;

    const axiosSecure = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL
    })
    // request interceptor
    axiosSecure.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // response interceptor
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;
        const isBrowser = typeof window !== 'undefined';
        const currentPath = isBrowser ? window.location.pathname : '';
        if (status === 401 && currentPath !== '/login' && currentPath !== '/') {
            await signOut({ redirect: true, callbackUrl: '/login' });
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};
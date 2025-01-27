import axios from 'axios';
import { SignInTypes, SignUpTypes } from './types';
import { FormData } from '@/shared/types/FormData';
export const SignUpApi = async (formData: FormData) => {
    try {
        const response = await axios.post<SignUpTypes>(
            `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/register`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorMessage = e.response?.data?.message || e.message || "Неизвестная ошибка";
            throw new Error(errorMessage);
        } else {
            throw new Error("Произошла неизвестная ошибка.");
        }
    }
}


export const SignInApi = async (formData: FormData) => {
    try {
        const response = await axios.post<SignInTypes>(
            `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/login`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorMessage = e.response?.data?.message || e.message || "Неизвестная ошибка";
            throw new Error(errorMessage);
        } else {
            throw new Error("Произошла неизвестная ошибка.");
        }
    }
}



/*
export const IsValidToken = async ( ) => {
    try {
        const response = await axios.get<SignInTypes>(
            `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/checkToken?${localStorage.getItem('token')}`,
        
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorMessage = e.response?.data?.message || e.message || "Неизвестная ошибка";
            throw new Error(errorMessage);
        } else {
            throw new Error("Произошла неизвестная ошибка.");
        }
    }
}
*/
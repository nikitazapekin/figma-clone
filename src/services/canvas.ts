import axios from 'axios';
import { FigureObject, LineObject } from './types';

export const setCanvasElements = async (
    
    arrayOfFigures: FigureObject[],
    arrayOfLines: LineObject[],
    id: string
) => {
    try {
        const response = await axios.post(
            `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/setCanvas`,
            { arrayOfFigures, arrayOfLines, id: id }, 
            {
                headers: {
                  
                    'Content-Type': 'application/json',
                },
                withCredentials: true,  
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || 'Неизвестная ошибка';
            throw new Error(errorMessage);
        }
        throw new Error('Произошла неизвестная ошибка.');
    }
};

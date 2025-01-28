import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AllDraftsResponse } from './types';

const API_URL = `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}`;

const serverApiInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Для передачи cookies на сервер
});

// Интерсептор для обработки запросов
serverApiInstance.interceptors.request.use(
  (config) => {
    // Токен извлекается автоматически из cookies, и вам не нужно вручную его добавлять
    // Сервер сам проверит токен в HttpOnly cookies
    return config;
  },
  (error) => {
    console.error('Error in request interceptor', error);
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов и ошибок
serverApiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error('No response from server:', error);
      throw new Error('No response from server');
    }

    // Если ошибка 401 (не авторизован) и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true; // Флаг для предотвращения повторного запроса

      try {
        console.error('Токены недействительны, перенаправление на страницу логина...');
        // Можно выполнить перенаправление, или обработать ошибку каким-либо образом
        // window.location.href = '/login'; // Для клиентского рендеринга
      } catch (err) {
        console.error('Ошибка при попытке обновить токены:', err);
      }
    }

    console.error('API request error', error.response?.status);
    return Promise.reject(error);
  }
);

// Сервис для работы с черновиками
export default class DraftsService {
  // Метод для получения всех черновиков
  static async getAllDrafts(): Promise<AxiosResponse<AllDraftsResponse>> {
    try {
      const response = await serverApiInstance.get<AllDraftsResponse>('/drafts');
      return response;
    } catch (error) {
      console.error("Не удалось получить черновики:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
}

/*
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AllDraftsResponse } from './types';

const API_URL = `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}`;

const serverApiInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Для передачи cookies на сервер
});

// Глобальная переменная для хранения токенов
let token: string | null = null;

// Интерсептор для обработки запросов
serverApiInstance.interceptors.request.use(
  async (config) => {
    // Если токен уже есть в памяти, добавляем его в заголовки запроса
   // if (token) {
    //config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzgwNzE3OTIsInVzZXJfaWQiOjE4fQ.YyNv-O9-Vtgkgey_116l6r0sWrZqFbPntN7LuodY5sw`;
 //   }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов и ошибок
serverApiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 (не авторизован) и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true; // Флаг для предотвращения повторного запроса

      try {
        // Когда access_token истек, сервер сам проверит refresh_token (так как он хранится в HttpOnly cookies)
        console.error('Токены недействительны, перенаправление на страницу логина...');
     //   window.location.href = '/login'; // Перенаправление на страницу логина
      } catch (err) {
        console.error('Ошибка при попытке обновить токены:', err);
      }
    }

    return Promise.reject(error);
  }
);

// Сервис для работы с черновиками
export default class DraftsService {
  // Метод для получения всех черновиков
  static async getAllDrafts(): Promise<AxiosResponse<AllDraftsResponse>> {
    try {
      return await serverApiInstance.get<AllDraftsResponse>('/drafts');
    } catch (error) {
      console.error("Не удалось получить черновики:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
}
*/
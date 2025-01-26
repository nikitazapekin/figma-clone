import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SignUpTypes } from './types';
import { FormData } from '@/shared/types/FormData';



export const SignUpApi = async (formData: FormData) => {
try {

    const response = await axios.post<SignUpTypes>(
    //    `http://${process.env.NEXT_BASE_URL}/signUp`,
    //http://localhost:8080/register
    `http://localhost:8080/register`,
        formData,  
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json', 
            },
        }
    );
    console.log(response.data)
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
const API_URL = `http://${process.env.NEXT_BASE_URL}/signUp`;

const signUpApiInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

signUpApiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response.data)
    return response.data;  
  },
  async (error) => {
  
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || "Неизвестная ошибка";
      return Promise.reject(new Error(errorMessage));
    }

    
    return Promise.reject(new Error("Произошла неизвестная ошибка"));
  }
);

export default signUpApiInstance;
*/

/*
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { AxiosResponse } from 'axios';
import { SignUpTypes } from './types';
const API_URL = `http://${process.env.NEXT_BASE_URL}/signUp`
const serverApiInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,

});


serverApiInstance.interceptors.response.use(
    (response) => {
     
      return response;
    },
    async (error) => {
     
      try {
        const response = await axios.post<SignUpTypes>(`${API_URL}`, { withCredentials: true });
        return response;
      } catch (e) {
        return Promise.reject(e);
      }
    }
  );
  */
/*
serverApiInstance.interceptors.response.use((
    //config

) => {
    //  return config;
}, async (error: Er) => {
    
    try {
       
        const response = await axios.post<SignUpTypes>(`${API_URL}`, { withCredentials: true })
        return response
    } catch (e) {
    return e.message
    }
}
    throw error;
})

*/



/*
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { AxiosResponse } from 'axios';
interface PersonalData {
    username: string,
    tel: string,
    country: string
}
export interface AuthResponse {
    token: string;
    error: string

}
interface RefreshProps {
    refresh_token: string
}

interface AccessProps {
    access_token: string
}

interface PersonalData {
    access_token: string,
    username: string,
    country: string,
    tel: string,
    chats: Object,
    avatar: string,
    description: string,

}

 
const API_URL = `http://${process.env.REACT_APP_API_BASE_URL}/${`chat`}/`
const serverApiInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,

});
serverApiInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
serverApiInstance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const user = localStorage.getItem("username")
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get<AuthResponse>(`${API_URL}token?token=${token}&user=${user}`, { withCredentials: true })
            localStorage.setItem('token', JSON.stringify({ token: response.data.token }));
            return serverApiInstance.request(originalRequest);
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
    throw error;
})

export default class AuthService {
    static async login(username: string, country: string, tel: string): Promise<AxiosResponse<AuthResponse>> {
        return serverApiInstance.post<AuthResponse>('/sign-in', { username, tel, country })
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return serverApiInstance.post<AuthResponse>('/registration', { email, password })
    }
    static async logout(): Promise<void> {
        return serverApiInstance.post('/logout')
    }
    static async getRefreshToken(): Promise<AxiosResponse<RefreshProps>> {
        try {
           
            const response = await serverApiInstance.get<RefreshProps>('/refresh-token');
            return response;
        } catch (error) {
            throw new Error('Failed to fetch refresh token');
        }
    }
    static async getAccessToken(): Promise<AxiosResponse<AccessProps>> {
        try {
            const response = await serverApiInstance.get<AccessProps>('token');
            console.log("reap " + JSON.stringify(response))

         
            return response;
        } catch (error) {
            throw new Error('Failed to fetch access token');
        }
    }
    static async getUserData(): Promise<AxiosResponse<any>> {
        try {
            const response = await serverApiInstance.get<PersonalData>(`/personal`);
            return response;
        } catch (error) {
            throw new Error('Failed to fetch access token');
        }
    }
}
export const personalApi = {
    AuthAction(data: PersonalData) {
        return serverApiInstance.post(`/sign-in`, {
            username: data.username,
            country: data.country,
            tel: data.tel
        }
        )
    },
    Test() {
        return serverApiInstance.get(`hello`, {
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }





































 

};*/
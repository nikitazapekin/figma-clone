import axios from 'axios';

export const GetAllDraftsApi = async (token: string) => {
  try {
    const response = await axios.get(
      `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/drafts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

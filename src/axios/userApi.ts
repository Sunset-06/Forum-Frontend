import axios, { AxiosInstance } from 'axios';

export interface User {
  id:string;
  username: string;
  email: string;
  bio: string;
  pfp: string;
}

const userApi: AxiosInstance = axios.create({
  baseURL: '/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (userData: User): Promise<User> => {
  try {
    const response = await userApi.post<User>('',userData);
    return response.data; 
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await userApi.get<User>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const getUserPfp = async (id: string): Promise<string> => {
  try {
    const response = await userApi.get<User>(`/${id}`);
    return response.data.pfp ?? 'src/assets/def-pfp.png'; 
  } catch (error) {
    console.error(`Error fetching profile picture for user with ID ${id}:`, error);
    return 'src/assets/def-pfp.png'; 
  }
}

export const getAllUsers = async (): Promise<User[]> => {
  try { 
    const response = await userApi.get<User[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: FormData): Promise<User> => {
  try {
    const response = await axios.put<User>(`/api/users/${id}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<string> => {
  try {
    const response = await userApi.delete<string>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export default userApi;
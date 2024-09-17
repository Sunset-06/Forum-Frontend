interface User {
    id: string;
    username: string;
    email: string;
    bio: string;
    pfpUrl: string;
  }
  
interface NewUser {
    id: string;
    username: string;
    email: string;
  }

interface UpdateUser {
    id: string;
    username: string;
    email: string;
    bio: string;
    pfpUrl: string;
  }

import axios, { AxiosInstance } from 'axios';

const userApi: AxiosInstance = axios.create({
  baseURL: '/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a new user
export const createUser = async (userData: NewUser): Promise<User> => {
  try {
    const response = await userApi.post<User>('/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Function to get a user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await userApi.get<User>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await userApi.get<User[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Function to update a user by ID
export const updateUser = async (id: string, userData: UpdateUser): Promise<User> => {
  try {
    const response = await userApi.put<User>(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a user by ID
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
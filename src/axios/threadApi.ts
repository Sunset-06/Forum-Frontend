import axios, { AxiosInstance } from 'axios';

export interface Thread {
    id: string;
    title: string;
    content: string;
    authorId: string; 
    authorName: string; 
    created: { seconds: number; nanos: number };
    lastPost?: { seconds: number; nanos: number };
    updatedAt?: { seconds: number; nanos: number };
    pfpUrl: string; 
    postCount: number;
    category: string | null;
  }

const threadApi: AxiosInstance = axios.create({
  baseURL: '/api/threads',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createThread = async (newThread: Thread): Promise<Thread> => {
  try {
    const response = await threadApi.post<Thread>('', newThread);
    return response.data;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};

export const getThreadById = async (id: string): Promise<Thread> => {
  try {
    const response = await threadApi.get<Thread>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching thread with ID ${id}:`, error);
    throw error;
  }
};

export const getAllThreads = async (): Promise<Thread[]> => {
  try {
    const response = await threadApi.get<Thread[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all thread:', error);
    throw error;
  }
};

export const updateThread = async (id: string, updatedThread: Thread): Promise<Thread> => {
  try {
    const response = await threadApi.put<Thread>(`/${id}`, updatedThread);
    return response.data;
  } catch (error) {
    console.error(`Error updating thread with ID ${id}:`, error);
    throw error;
  }
};

export const deleteThread = async (id: string): Promise<string> => {
  try {
    const response = await threadApi.delete<string>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting thread with ID ${id}:`, error);
    throw error;
  }
};

export default threadApi;  
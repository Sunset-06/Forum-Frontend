import axios, { AxiosInstance } from 'axios';

interface Thread {
    id: string;
    title: string;
    content: string;
    authorId: string; 
    createdAt: string;
    updatedAt?: string; 
    pfpUrl?: string; 
    posts: number;
  }
  
interface NewThread {
    title: string;
    content: string;
    authorId: string; 
    createdAt: string;
    updatedAt?: string; 
    pfpUrl?: string; 
    posts: number;
}
  
interface UpdateThread {
    title: string;
    content: string;
    authorId: string; 
    createdAt: string;
    updatedAt?: string; 
    pfpUrl?: string; 
    posts: number;
}

const threadApi: AxiosInstance = axios.create({
  baseURL: '/api/posts',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a new post
export const createThread = async (postData: NewThread): Promise<Thread> => {
  try {
    const response = await threadApi.post<Thread>('/', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Function to get a post by ID
export const getThreadById = async (id: string): Promise<Thread> => {
  try {
    const response = await threadApi.get<Thread>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Function to get all posts
export const getAllThreads = async (): Promise<Thread[]> => {
  try {
    const response = await threadApi.get<Thread[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

// Function to update a post by ID
export const updateThread = async (id: string, postData: UpdateThread): Promise<Thread> => {
  try {
    const response = await threadApi.put<Thread>(`/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a post by ID
export const deleteThread = async (id: string): Promise<string> => {
  try {
    const response = await threadApi.delete<string>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

export default threadApi;  
import axios, { AxiosInstance } from 'axios';

interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string; 
    createdAt: string;
    updatedAt?: string; 
    pfpUrl?: string; 
  }
  
interface NewPost {
    title: string;
    content: string;
    authorId: string;
  }
  
interface UpdatePost {
    title?: string;
    content?: string;
}

const postApi: AxiosInstance = axios.create({
  baseURL: '/api/posts',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a new post
export const createPost = async (postData: NewPost): Promise<Post> => {
  try {
    const response = await postApi.post<Post>('/', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Function to get a post by ID
export const getPostById = async (id: string): Promise<Post> => {
  try {
    const response = await postApi.get<Post>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Function to get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await postApi.get<Post[]>('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

// Function to update a post by ID
export const updatePost = async (id: string, postData: UpdatePost): Promise<Post> => {
  try {
    const response = await postApi.put<Post>(`/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a post by ID
export const deletePost = async (id: string): Promise<string> => {
  try {
    const response = await postApi.delete<string>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

export default postApi;  
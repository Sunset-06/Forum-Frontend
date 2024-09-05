import axios, { AxiosInstance } from 'axios';

export interface Post {
    id: string;
    content: string;
    authorName: string;
    created: { seconds: number; nanos: number };
    pfpUrl: string;
}

interface NewPost {
    title: string;
    content: string;
    authorName: string;
}

interface UpdatePost {
    title?: string;
    content?: string;
}

const createPostApiInstance = (threadId: string): AxiosInstance => {
  return axios.create({
    baseURL: `/api/threads/${threadId}/posts`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPost = async (threadId: string, postData: NewPost): Promise<Post> => {
  const postApi = createPostApiInstance(threadId);
  try {
    const response = await postApi.post<Post>('/', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPostById = async (threadId: string, id: string): Promise<Post> => {
  const postApi = createPostApiInstance(threadId);
  try {
    const response = await postApi.get<Post>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

export const getAllPosts = async (threadId: string): Promise<Post[]> => {
  const postApi = createPostApiInstance(threadId);
  try {
    const response = await postApi.get<Post[]>("");
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

export const updatePost = async (threadId: string, id: string, postData: UpdatePost): Promise<Post> => {
  const postApi = createPostApiInstance(threadId);
  try {
    const response = await postApi.put<Post>(`/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (threadId: string, id: string): Promise<string> => {
  const postApi = createPostApiInstance(threadId);
  try {
    const response = await postApi.delete<string>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

export default createPostApiInstance;

import axios, { AxiosResponse } from "axios";

export const BASE_URL = "https://e-commerce-api-rouge.vercel.app";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Optional: Set up an interceptor to automatically include authorization tokens
// api.interceptors.request.use(async (config) => {
//   const token = await getToken(); // Make sure getToken is correctly implemented
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Utility function to handle GET requests
export const get = async <T>(url: string): Promise<T> => handleRequest(api.get<T>(url));

// Generalized request handler
export const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await request;
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

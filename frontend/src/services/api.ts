import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession, signOut } from "next-auth/react";

// Create axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

// Request interceptor - Add access token to requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    if (session?.user) {
      try {
        config.headers["x-user-id"] = session.user.id;
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      } catch (error) {
        console.log(error);
        // signOut();
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Authentication failed - NextAuth will handle refresh
      // Just redirect to login
      console.error("Authentication failed, redirecting to login");
      console.error(error);
      // window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default api;

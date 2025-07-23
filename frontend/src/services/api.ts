import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";

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
      // Just send user data - trust NextAuth validation
      config.headers["X-User-Id"] = session.user.id;
      config.headers["X-User-Email"] = session.user.email;
      config.headers["X-User-Role"] = session.user.role;

      // Add access token if available
      if (session.user.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
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
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default api;

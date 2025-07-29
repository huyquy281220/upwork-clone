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
      // Verify session is still valid before making request
      try {
        await api.post(
          "/auth/verify-session",
          {},
          {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          }
        );

        config.headers["X-User-Id"] = session.user.id;
        config.headers["X-User-Email"] = session.user.email;
        config.headers["X-User-Role"] = session.user.role;
      } catch (error) {
        // Session invalid, redirect to login
        signOut();
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
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default api;

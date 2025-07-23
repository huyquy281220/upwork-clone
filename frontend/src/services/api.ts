import { deleteCookie, setCookie } from "@/lib/cookie";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";

// Types
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

interface QueueItem {
  resolve: (value?: string | null) => void;
  reject: (error?: AxiosError) => void;
}

// Create axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

// Flag to prevent multiple refresh attempts
let isRefreshing: boolean = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            }
          })
          .catch((err: AxiosError) => {
            return Promise.reject(err);
          });
      }

      if (originalRequest) {
        originalRequest._retry = true;
      }
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Include cookies
          }
        );

        const { accessToken } = response.data;
        setCookie("accessToken", accessToken);

        // Update authorization header for original request
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request
        return originalRequest ? api(originalRequest) : Promise.reject(error);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError as AxiosError, null);
        deleteCookie("accessToken");

        // Redirect to login page or dispatch logout action
        // window.location.href = "/sign-in";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

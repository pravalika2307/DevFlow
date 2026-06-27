import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Expand internal request config interface to hold retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Crucial for sending secure HttpOnly refresh cookies
});

// Cache variables for access token state
let accessTokenCache: string | null = null;
let refreshSubscribers: ((token: string) => void)[] = [];
let isRefreshing = false;

export const setAccessToken = (token: string | null) => {
  accessTokenCache = token;
};

export const getAccessToken = () => {
  return accessTokenCache;
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Request Interceptor: Attach bearer tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessTokenCache && config.headers) {
      config.headers.Authorization = `Bearer ${accessTokenCache}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Catch 401 and execute JWT rotation
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Check if error is 401 and it's not a retry or a direct login/register endpoint
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register")
    ) {
      if (isRefreshing) {
        // Queue the request until token refresh finishes
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Trigger silent token rotation using secure cookie backend
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { access_token } = response.data;
        setAccessToken(access_token);

        isRefreshing = false;
        onTokenRefreshed(access_token);

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        setAccessToken(null);

        // Dispatch custom event to let Zustand or routing know they should redirect to login
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-session-expired"));
        }

        return Promise.reject(refreshError);
      }
    }

    // Format standardized API errors for easier UI handling
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);
